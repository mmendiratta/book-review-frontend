import { useState, Fragment } from 'react';
import { Button, Modal, Form, Input, Rate, Spin, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAccountRoles } from '../../services/accountsApi';
import { GENRES } from '../../constants/genres';
import { API_URL } from '../../config';

const { TextArea } = Input;

export const CreateReview = ({ refreshReviews }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const userRoles = getAccountRoles();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleModalState = () => {
    setModalOpen((prev) => !prev);
    setImageFile(null);
    form.resetFields();
  };

  const createNewPost = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('review', values.review);
      formData.append('rating', values.rating);
      formData.append('genre', values.genre);
      if (values.isbn) formData.append('isbn', values.isbn);
      if (imageFile) formData.append('image', imageFile);

      await fetch(`${API_URL}/api/book-reviews`, {
        method: 'POST',
        body: formData,
      });
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
            <Form.Item name="isbn">
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
                <Button icon={<UploadOutlined />}>Upload Cover</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Fragment>
  );
};
