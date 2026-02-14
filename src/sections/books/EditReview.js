import { Fragment, useState } from 'react';
import { Modal, Form, Input, Rate, Upload, Button, Spin, Select } from 'antd';
import { useBookSelectionContext } from '../../BookSelectionContext';
import { UploadOutlined } from '@ant-design/icons';
import { THUMBSNAP_CONFIG } from '../../config';
import { GENRES } from '../../constants/genres';

const { TextArea } = Input;

const postToThumbsnap = async (file) => {
  const formData = new FormData();
  formData.append('media', file.originFileObj);
  formData.append('key', THUMBSNAP_CONFIG.API_KEY);
  const response = await fetch(`${THUMBSNAP_CONFIG.API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const EditReview = ({ selectedBook, refreshReviews }) => {
  const { editBook, setEditBook, setSelectedBookReview } = useBookSelectionContext();
  const [form] = Form.useForm();
  const [newImg, setNewImg] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleModalState = () => {
    form.resetFields();
    setNewImg(false);
    setEditBook(false);
  };

  const editBookReview = async (values, url, id) => {
    setUpdating(true);
    try {
      const uploadData = newImg ? await postToThumbsnap(values.upload[0]) : null;
      await fetch(
        `https://book-review-backend-pl3j.onrender.com/api/book-reviews/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            id,
            title: values.title,
            author: values.author,
            review: values.review,
            rating: values.rating,
            genre: values.genre,
            url: newImg ? uploadData.data.media || '' : url,
          }),
        }
      );
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
        `https://book-review-backend-pl3j.onrender.com/api/book-reviews/${id}`,
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
                selectedBook?.review.url,
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
            <Button
              onClick={() => deleteBookReview(selectedBook?.review._id)}
              danger
              loading={deleting}
              style={{ marginBottom: 12 }}
            >
              Delete Review
            </Button>
            <Form.Item name="upload" getValueFromEvent={normFile}>
              <Upload name="bookCover">
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => setNewImg(true)}
                >
                  Edit Book Cover
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Fragment>
  );
};
