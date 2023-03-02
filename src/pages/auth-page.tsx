import { useState } from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import '../assets/styles/authPage.css';
import 'antd/dist/antd.css';

function SignInInputs({ setFormType }: any) {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Sign In User
      </Typography.Title>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" />
      </Form.Item>
      <span onClick={() => setFormType('forgot')} className="forgot-password">
        *Forgot password?
      </span>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn">
          Sign In
        </Button>
      </Form.Item>
    </>
  );
}

function SignUpInputs() {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Sign Up User
      </Typography.Title>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" />
      </Form.Item>
      <Form.Item label="Confirm password" name="cf-password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn">
          Sign In
        </Button>
      </Form.Item>
    </>
  );
}

function ForgotInputs() {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Reset Password
      </Typography.Title>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn">
          Sign In
        </Button>
      </Form.Item>
    </>
  );
}

export default function AuthPage() {
  const [formType, setFormType] = useState('signIn');

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="auth-page">
      <Form layout="vertical" className="auth-form" onFinish={onFinish}>
        {formType === 'signIn' && <SignInInputs setFormType={setFormType} />}
        {formType === 'signUp' && <SignUpInputs />}
        {formType === 'forgot' && <ForgotInputs />}

        {formType !== 'forgot' && (
          <>
            <Divider style={{ borderColor: '#101319', marginBottom: '8px' }}>
              {formType === 'signIn' ? 'or sign in using' : 'or sign up using'}{' '}
            </Divider>
            <div className="social-auth-options">
              <img src="/google-brand.png" />
              <img src="/github-mark.png" />
              <img src="/facebook-brand.png" />
            </div>
          </>
        )}

        <div className="text-center">
          {formType === 'signIn' ? "Don't have an account? " : 'Already have an account ? '}
          <strong onClick={() => setFormType(formType === 'signIn' ? 'signUp' : 'signIn')}>{formType === 'signIn' ? 'Sign Up' : 'Sign In'}</strong>
        </div>
      </Form>
    </div>
  );
}
