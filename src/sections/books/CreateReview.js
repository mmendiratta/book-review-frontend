import { useState, Fragment } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Rate, Upload, Spin, Select } from 'antd';
import { getAccountRoles } from '../../services/accountsApi';
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
      const uploadData = await postToThumbsnap(values.upload[0]);
      await fetch(
        'https://book-review-backend-pl3j.onrender.com/api/book-reviews',
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
            url: uploadData.data.media || '',
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
            <Form.Item name="upload" getValueFromEvent={normFile}>
              <Upload name="bookCover">
                <Button icon={<UploadOutlined />}>Upload Book Cover</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Fragment>
  );
};
