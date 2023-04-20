import { Modal, Row, Col, Button, Form, Input, FormInstance, Select, Empty, SelectProps, Spin, Image, Upload } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { buttonStyle, inputStyle, secondaryButtonStyle } from '../../../assets/styles/globalStyle';
import { ICategory, IProduct } from '../../../types';
import { DeleteFilled, MoneyCollectOutlined } from '@ant-design/icons';
import useFiles from '../../../services/files';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import Slider from 'react-slick';
interface UpdateProductModalProps {
  shouldOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: IProduct) => void;
  isLoading?: boolean;
  product: IProduct | null;
  onSearchCategory: (value: string) => void;
  onCategoryChange: (value: string) => void;
  categories: ICategory[] | undefined;
  isLoadingCategory: boolean;
}
export default function UpdateProductModal({
  onCategoryChange,
  onSearchCategory,
  product,
  shouldOpen,
  onCancel,
  onSubmit,
  isLoading,
  categories,
  isLoadingCategory,
}: UpdateProductModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const onInternalCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (product && shouldOpen)
      form.setFieldsValue({
        ...product,
        'name.vi': product.name.vi,
        'name.en': product.name.en,
        'description.vi': product.description.vi,
        'description.en': product.description.en,
        category: (product.category as any)?._id,
      });
  }, [shouldOpen]);

  return (
    <Modal
      open={shouldOpen}
      destroyOnClose
      closable={false}
      title={<h3>{t('update product')}</h3>}
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
          <UpdateProductForm
            product={product}
            form={form}
            onSubmit={onSubmit}
            categories={categories}
            isLoadingCategory={isLoadingCategory}
            onCategoryChange={onCategoryChange}
            onSearchCategory={onSearchCategory}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export const UpdateProductForm = ({
  form,
  onSubmit,
  product,
  categories,
  isLoadingCategory,
  onSearchCategory,
  onCategoryChange,
}: {
  isLoadingCategory: boolean;
  categories: ICategory[] | undefined;
  form: FormInstance;
  onSubmit: (values: IProduct) => void;
  product: IProduct | null;
  onSearchCategory: (value: string) => void;
  onCategoryChange: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const { uploadMutation, deleteMutation } = useFiles();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';
  const [featuredImages, setFeaturedImages] = useState<string[]>(product?.featuredImages || []);
  const onFinish = (values: any) => {
    onSubmit({
      category: values.category.value,
      featuredImages,
      isAvailable: values.isAvailable,
      price: values.price,
      name: {
        vi: values['name.vi'],
        en: values['name.en'],
      },
      description: {
        vi: values['description.vi'],
        en: values['description.en'],
      },
    });
  };

  const onDeleteFeaturedImage = async (image: string) => {
    await deleteMutation.mutateAsync(image);
    setFeaturedImages(prev => prev?.filter(item => item !== image));
  };

  const handleUpload = ({ file }: UploadRequestOption<any>) => {
    uploadMutation.mutateAsync({ file, folder: 'products' }).then(res => {
      const url = res.data.data?.url;
      setFeaturedImages(prev => [url, ...prev]);
    });
  };

  const categoryOptions: SelectProps['options'] = useMemo(() => {
    if (isLoadingCategory) return [{ key: 'loading', label: <Spin />, disabled: true }];
    else if (!categories?.length) return [{ key: 'empty', label: <Empty />, disabled: true }];
    return categories.map(category => ({ key: category._id, label: category.name[locale], value: category._id }));
  }, [categories, isLoadingCategory]);

  return (
    <>
      <Row align="middle" justify="space-between" style={{ padding: '8px 0' }}>
        <Col>
          <div style={{ textAlign: 'left' }}>
            <label>{t('featured images')}</label>
          </div>
        </Col>
        <Col>
          <Upload customRequest={handleUpload} accept="image/*" showUploadList={false} multiple>
            <Button loading={uploadMutation.isLoading} type="primary" shape="round" ghost size="large">
              <small>
                <strong>+ {t('add')}</strong>
              </small>
            </Button>
          </Upload>
        </Col>
      </Row>
      {featuredImages && featuredImages?.length > 0 && (
        <Slider dots infinite>
          {featuredImages?.map((image, idx) => (
            <div key={image + idx}>
              <div style={{ position: 'relative' }}>
                <Image preview={false} src={image} />
                <Button
                  loading={deleteMutation.isLoading}
                  style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '10' }}
                  danger
                  shape="circle"
                  type="primary"
                  icon={<DeleteFilled />}
                  onClick={() => onDeleteFeaturedImage(image)}
                ></Button>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {!featuredImages?.length && <Empty />}

      <Form style={{ marginTop: '28px' }} requiredMark={false} layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" form={form}>
        <Form.Item
          label={t('name vi')}
          name="name.vi"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('name vi').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item
          label={t('name en')}
          name="name.en"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('name en').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item
          label={t('description vi')}
          name="description.vi"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('description vi').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item
          label={t('description en')}
          name="description.en"
          rules={[
            { required: true, message: t('required').toString() },
            { whitespace: true, message: t('required').toString() },
          ]}
        >
          <Input size="large" spellCheck={false} placeholder={t('description en').toString()} style={inputStyle} />
        </Form.Item>
        <Form.Item name="price" rules={[{ required: true, message: t('required').toString() }]}>
          <Input
            prefix={<MoneyCollectOutlined />}
            size="large"
            type="number"
            spellCheck={false}
            placeholder={t('price').toString()}
            style={inputStyle}
          />
        </Form.Item>
        <Form.Item name="category" label={t('category')} rules={[{ required: true, message: t('required').toString() }]}>
          <Select
            placeholder={t('select category')}
            labelInValue
            filterOption={false}
            showSearch
            onSearch={onSearchCategory}
            size="large"
            onChange={onCategoryChange}
            options={categoryOptions}
          ></Select>
        </Form.Item>

        <Form.Item name="isAvailable" label={t('is available')} initialValue={true}>
          <Select size="large">
            <Select.Option value={true}>{t('yes')}</Select.Option>
            <Select.Option value={false}>{t('no')}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
