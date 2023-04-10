import { LoadingOutlined, LockOutlined, MailOutlined, PlusOutlined, CompassOutlined, PhoneOutlined } from '@ant-design/icons';
import { Modal, Row, Col, Button, Form, Input, Upload, FormInstance, Avatar, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyle, inputStyle, secondaryButtonStyle } from '../../../assets/styles/globalStyle';
import { IOrder } from '../../../types';
interface UpdateOrderModalProps {
  shouldOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: IOrder) => void;
  isLoading?: boolean;
  order: IOrder | null;
}
export default function UpdateOrderModal({ order, shouldOpen, onCancel, onSubmit, isLoading }: UpdateOrderModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onInternalCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (order && shouldOpen) form.setFieldsValue(order);
  }, [shouldOpen]);

  return (
    <Modal
      open={shouldOpen}
      destroyOnClose
      closable={false}
      title={<h3>{t('update order')}</h3>}
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
          <UpdateOrderForm order={order} form={form} onSubmit={onSubmit} />
        </Col>
      </Row>
    </Modal>
  );
}

export const UpdateOrderForm = ({ form, onSubmit, order }: { form: FormInstance; onSubmit: (values: IOrder) => void; order: IOrder | null }) => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    onSubmit({ ...values });
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" form={form}></Form>
    </>
  );
};
