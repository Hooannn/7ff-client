import { FC, useState } from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" style={inputStyle} />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" style={inputStyle} />
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
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" style={inputStyle} />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" style={inputStyle} />
      </Form.Item>
      <Form.Item label="Confirm password" name="cf-password" rules={[{ required: true, message: 'Please enter your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter your password" style={inputStyle} />
      </Form.Item>
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
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} spellCheck={false} placeholder="Enter your email" style={inputStyle} />
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
};

export default AuthPage;
