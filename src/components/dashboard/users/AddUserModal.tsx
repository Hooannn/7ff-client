import { LoadingOutlined, LockOutlined, MailOutlined, PlusOutlined, CompassOutlined, PhoneOutlined } from '@ant-design/icons';
import { Modal, Row, Col, Button, Form, Input, Upload, FormInstance, Avatar, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyle, inputStyle, secondaryButtonStyle } from '../../../assets/styles/globalStyle';
import useFiles from '../../../services/files';
import { IUser } from '../../../types';
interface AddUserModalProps {
  shouldOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: IUser) => void;
  isLoading: boolean;
}
export default function AddUserModal({ shouldOpen, onCancel, onSubmit, isLoading }: AddUserModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onInternalCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={shouldOpen}
      destroyOnClose
      closable={false}
      title={<h3>{t('new user')}</h3>}
      onCancel={onInternalCancel}
      footer={
        <Row align="middle" justify="end" gutter={12}>
          <Col span={6}>
            <Button loading={isLoading} block type="text" shape="round" style={buttonStyle} onClick={() => onInternalCancel()}>
              <strong>{t('cancel')}</strong>
            </Button>
          </Col>
          <Col span={6}>
            <Button loading={isLoading} onClick={() => form.submit()} block shape="round" style={secondaryButtonStyle}>
              <strong>{t('confirm')}</strong>
            </Button>
          </Col>
        </Row>
      }
    >
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <AddUserForm form={form} onSubmit={onSubmit} />
        </Col>
      </Row>
    </Modal>
  );
}

export const AddUserForm = ({ form, onSubmit }: { form: FormInstance; onSubmit: (values: IUser) => void }) => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqtrHsVnbfPaERaPm8v_vcvIXYxCGR0Lnbcw&usqp=CAU');
  const { uploadMutation } = useFiles();
  const handleUpload = ({ file }: any) => {
    uploadMutation.mutateAsync({ file, folder: 'avatar' }).then(res => {
      const newUrl = res.data.data?.url;
      setAvatar(newUrl);
    });
  };

  const onFinish = (values: any) => {
    onSubmit({ ...values, avatar });
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        accept="image/*"
        showUploadList={false}
        customRequest={handleUpload}
      >
        {avatar && !uploadMutation.isLoading ? (
          <Avatar src={avatar} size={100} />
        ) : (
          <div>
            {uploadMutation.isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" form={form}>
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('first name...').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('last name...').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
            { type: 'email', message: t('invalid email address').toString() },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            spellCheck={false}
            placeholder="Email..."
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="address">
          <Input
            size="large"
            prefix={<CompassOutlined className="site-form-item-icon" />}
            spellCheck={false}
            placeholder={t('address') + '...'}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="phoneNumber">
          <Input
            size="large"
            type="number"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            spellCheck={false}
            placeholder={t('phone number') + '...'}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: t('required').toString() }]}>
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t('password...').toString()}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="role" label={t('role')} initialValue={'User'}>
          <Select defaultValue={'User'} size="large">
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
