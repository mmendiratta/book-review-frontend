import { useState, Fragment } from 'react';
import { Button, Modal, Form, Input, Rate, Spin, Select } from 'antd';
import { getAccountRoles } from '../../services/accountsApi';
import { GENRES } from '../../constants/genres';
import { API_URL } from '../../config';

const { TextArea } = Input;

export const CreateReview = ({ refreshReviews }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const userRoles = getAccountRoles();
  const [loading, setLoading] = useState(false);

  const handleModalState = () => {
    setModalOpen((prev) => !prev);
    form.resetFields();
  };

  const createNewPost = async (values) => {
    setLoading(true);
    try {
      await fetch(
        `${API_URL}/api/book-reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            title: values.title,
            author: values.author,
            review: values.review,
            rating: values.rating,
            genre: values.genre,
            isbn: values.isbn,
          }),
        }
      );
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
      handleModalState();
      if (refreshReviews) refreshReviews();
    }
  };

  return (
    <Fragment>
      {userRoles && userRoles.includes('admin-role') && (
        <Button onClick={handleModalState}>Create Post</Button>
      )}
      <Modal
        open={modalOpen}
        title="Create a Book Review"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleModalState}
        confirmLoading={loading}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              await createNewPost(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" name="form_in_modal">
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please input the title of book!' }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="author"
              rules={[{ required: true, message: 'Please input the author!' }]}
            >
              <Input placeholder="Author" />
            </Form.Item>
            <Form.Item
              name="genre"
              rules={[{ required: true, message: 'Please select a genre!' }]}
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
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="isbn"
              rules={[{ required: true, message: 'Please input the ISBN!' }]}
            >
              <Input placeholder="ISBN" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Fragment>
  );
};
