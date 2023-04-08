import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import axiosIns from '../../libs/axios';
import { useState } from 'react';
export default function ProductsDashboardPage() {
  const [products, setProducts] = useState([]);

  const onBtnClick = async () => {
    const response = await axiosIns({
      url: '/products',
      method: 'GET',
    });
    console.log({ response });
    const data = response.data.data;
    setProducts(data);
  };

  return (
    <>
      <div></div>
      <Button onClick={onBtnClick}>Test</Button>

      {products.map((product: any) => (
        <div>{product._id}</div>
      ))}

      <AddProductForm />
    </>
  );
}

const AddProductForm = () => {
  const [isLoading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await axiosIns({
        url: '/products',
        method: 'POST',
        data: {
          price: values.productPrice,
          name: values.productName,
          description: values.productDescription,
          stocks: values.productStocks,
        },
      });
      setLoading(false);
    } catch (error) {
      toast.error('error');
      setLoading(false);
    }
  };
  const onFinishFailed = (values: any) => {
    console.log('failed', { values });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      requiredMark={false}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Product name" name="productName" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Product description" name="productDescription" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Product price" name="productPrice" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Product stocks" name="productStocks" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
