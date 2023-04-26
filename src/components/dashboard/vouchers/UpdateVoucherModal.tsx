import { PayCircleOutlined, TagOutlined } from '@ant-design/icons';
import { Modal, Row, Col, Button, Form, Input, FormInstance, Select, DatePicker } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyle, inputStyle, secondaryButtonStyle } from '../../../assets/styles/globalStyle';
import { IVoucher } from '../../../types';
import dayjs from 'dayjs';
interface UpdateVoucherModalProps {
  shouldOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: IVoucher) => void;
  isLoading?: boolean;
  voucher: IVoucher | null;
}
export default function UpdateVoucherModal({ voucher, shouldOpen, onCancel, onSubmit, isLoading }: UpdateVoucherModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onInternalCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (voucher && shouldOpen) form.setFieldsValue({ ...voucher, expiredDate: dayjs(voucher.expiredDate || Date.now()) });
  }, [shouldOpen]);

  return (
    <Modal
      open={shouldOpen}
      destroyOnClose
      closable={false}
      title={<h3>{t('update voucher')}</h3>}
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
          <UpdateVoucherForm voucher={voucher} form={form} onSubmit={onSubmit} />
        </Col>
      </Row>
    </Modal>
  );
}

export const UpdateVoucherForm = ({
  form,
  onSubmit,
  voucher,
}: {
  form: FormInstance;
  onSubmit: (values: IVoucher) => void;
  voucher: IVoucher | null;
}) => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    onSubmit({ ...values, expiredDate: values.expiredDate?.valueOf() || undefined });
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" form={form}>
        <Form.Item
          name="code"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input prefix={<TagOutlined />} size="large" spellCheck={false} placeholder={t('code').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item name="discountAmount" rules={[{ required: true, message: t('required').toString() }]}>
          <Input
            size="large"
            prefix={<PayCircleOutlined />}
            type="number"
            spellCheck={false}
            placeholder={t('discount amount').toString()}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="expiredDate" label={t('expired date')}>
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} size="large" />
        </Form.Item>
        <Form.Item name="discountType" label={t('discount type')} initialValue={'amount'}>
          <Select defaultValue={'amount'} size="large">
            <Select.Option value="amount">{t('amount')}</Select.Option>
            <Select.Option value="percent">{t('percent')}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
