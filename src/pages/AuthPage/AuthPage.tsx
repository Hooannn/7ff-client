import { FC, useState } from 'react';
import { Form, Input, Button, Typography, Divider, Space } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { inputStyle, buttonStyle } from '../../assets/styles/globalStyle';
import './AuthPage.css';

interface IProps {
  setFormType: (type: string) => void;
}

const SignInInputs: FC<IProps> = ({ setFormType }) => {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Sign In User
      </Typography.Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { whitespace: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email address' },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Email..." style={inputStyle} />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password..." style={inputStyle} />
      </Form.Item>
      <span onClick={() => setFormType('forgot')} className="forgot-password">
        *Forgot password?
      </span>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn" style={buttonStyle}>
          Sign In
        </Button>
      </Form.Item>
    </>
  );
};

const SignUpInputs: FC = () => {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Sign Up User
      </Typography.Title>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please enter your name' },
          { whitespace: true, message: 'Please enter your name' },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Name..." style={inputStyle} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { whitespace: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email address' },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Email..." style={inputStyle} />
      </Form.Item>
      <Space size="small">
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password..." style={inputStyle} />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="cf-password"
          rules={[
            { required: true, message: 'Please enter your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm password..." style={inputStyle} />
        </Form.Item>
      </Space>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn" style={buttonStyle}>
          Sign In
        </Button>
      </Form.Item>
    </>
  );
};

const ForgotInputs: FC = () => {
  return (
    <>
      <Typography.Title level={3} className="text-center">
        Reset Password
      </Typography.Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { whitespace: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email address' },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Email..." style={inputStyle} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="submit-btn" style={buttonStyle}>
          Sign In
        </Button>
      </Form.Item>
    </>
  );
};

const AuthPage: FC = () => {
  const [formType, setFormType] = useState<string>('signIn');

  const onFinish = (values: any) => {
    // Call API to server
    // Show toast msg
  };

  return (
    <div className="auth-page">
      <Form layout="vertical" className="auth-form" onFinish={onFinish} validateTrigger="onSubmit">
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
};

export default AuthPage;
