import { Fragment, useState } from 'react';
import { Modal, Form, Input, Rate, Button, Spin, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useBookSelectionContext } from '../../BookSelectionContext';
import { GENRES } from '../../constants/genres';
import { API_URL } from '../../config';

const { TextArea } = Input;

export const EditReview = ({ selectedBook, refreshReviews }) => {
  const { editBook, setEditBook, setSelectedBookReview } = useBookSelectionContext();
  const [form] = Form.useForm();
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleModalState = () => {
    setImageFile(null);
    form.resetFields();
    setEditBook(false);
  };

  const editBookReview = async (values, id) => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('review', values.review);
      formData.append('rating', values.rating);
      formData.append('genre', values.genre);
      if (values.isbn) formData.append('isbn', values.isbn);
      if (imageFile) formData.append('image', imageFile);

      await fetch(`${API_URL}/api/book-reviews/${id}`, {
        method: 'PUT',
        body: formData,
      });
    } catch (error) {
      console.error('Failed to edit post:', error);
    } finally {
      setUpdating(false);
      handleModalState();
      if (refreshReviews) refreshReviews();
    }
  };

  const deleteBookReview = async (id) => {
    setDeleting(true);
    try {
      await fetch(
        `${API_URL}/api/book-reviews/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      setSelectedBookReview(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setDeleting(false);
      setEditBook(false);
      if (refreshReviews) refreshReviews();
    }
  };

  return (
    <Fragment>
      <Modal
        open={editBook}
        title="Edit a Book Review"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleModalState}
        confirmLoading={updating}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              await editBookReview(
                values,
                selectedBook?.review._id
              );
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Spin spinning={updating || deleting}>
          <Form form={form} layout="vertical" name="form_in_modal">
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please input the title of book!' }]}
              initialValue={selectedBook?.review.title}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="author"
              rules={[{ required: true, message: 'Please input the author!' }]}
              initialValue={selectedBook?.review.author}
            >
              <Input placeholder="Author" />
            </Form.Item>
            <Form.Item
              name="genre"
              initialValue={selectedBook?.review.genre}
            >
              <Select placeholder="Select a genre">
                {GENRES.map(g => (
                  <Select.Option key={g.value} value={g.value}>
                    {g.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="review"
              rules={[{ required: true, message: 'Please add your review!' }]}
              initialValue={selectedBook?.review.review}
            >
              <TextArea
                showCount
                placeholder="Review"
                style={{ height: 120 }}
              />
            </Form.Item>
            <Form.Item
              name="rating"
              rules={[{ required: true, message: 'Please add your rating!' }]}
              initialValue={selectedBook?.review.rating}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="isbn"
              initialValue={selectedBook?.review.isbn}
            >
              <Input placeholder="ISBN (used for cover if no image uploaded)" />
            </Form.Item>
            <Form.Item label="Book Cover Image">
              <Upload
                accept="image/jpg,image/jpeg,image/png"
                maxCount={1}
                beforeUpload={(file) => {
                  setImageFile(file);
                  return false;
                }}
                onRemove={() => setImageFile(null)}
              >
                <Button icon={<UploadOutlined />}>Upload New Cover</Button>
              </Upload>
            </Form.Item>
            <Button
              onClick={() => deleteBookReview(selectedBook?.review._id)}
              danger
              loading={deleting}
              style={{ marginBottom: 12 }}
            >
              Delete Review
            </Button>
          </Form>
        </Spin>
      </Modal>
    </Fragment>
  );
};
