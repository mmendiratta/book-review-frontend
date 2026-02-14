import { Button, Form, Input, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/accountsApi';

const { Title } = Typography;

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await login(values);
    if (!success) {
      return console.log('Incorrect Credentials');
    }
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <Row>
        <Col>
          <Title level={2}>Login</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};