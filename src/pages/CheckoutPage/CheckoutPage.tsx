import { FC, useState, useEffect, useRef, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getI18n, useTranslation } from 'react-i18next';
import { Avatar, Button, Divider, Form, Input, Radio, Space, Switch, Tooltip, Image, Badge, ConfigProvider } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import useTitle from '../../hooks/useTitle';
import toastConfig from '../../configs/toast';
import { containerStyle, inputStyle } from '../../assets/styles/globalStyle';
import { RootState } from '../../@core/store';
import { IDetailedItem } from '../../types';
import { setTheme } from '../../slices/app.slice';
import '../../assets/styles/pages/CheckoutPage.css';
import { toast } from 'react-toastify';

interface IPrice {
  totalPrice: number;
  shippingFee: number;
}

// Fake data
const products = [
  {
    _id: 'hgh0001',
    name: 'Chicken burger',
    price: '30000',
    featuredImages: ['/food-images/burger-01.png'],
  },
  {
    _id: 'hgh0002',
    name: 'Fish burger',
    price: '35000',
    featuredImages: ['/food-images/burger-02.png'],
  },
  {
    _id: 'hgh0003',
    name: 'Beef burger',
    price: '40000',
    featuredImages: ['/food-images/burger-03.png'],
  },
];

const CheckoutPage: FC = () => {
  const { t } = useTranslation();
  const i18n = getI18n();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useTitle(`${t('checkout')} - 7FF`);

  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useSelector((state: RootState) => state.app.theme);
  const cartItems = useSelector((state: RootState) => state.app.cartItems);
  useEffect(() => {
    formRef.current?.setFieldsValue({ name: `${user.lastName} ${user.firstName}` });
  }, []);

  const DETAILED_CART_ITEMS = useMemo(() => {
    return cartItems.map((item: { productId: string; quantity: number }) => {
      // Products will be a global state fetched when app start
      // Or call api to get the product info
      const itemInfo = products.find(product => product._id === item.productId);
      return {
        ...item,
        name: itemInfo?.name,
        price: itemInfo?.price,
        image: itemInfo?.featuredImages[0],
      };
    });
  }, [cartItems]);
  const { totalPrice, shippingFee } = useMemo(() => {
    return DETAILED_CART_ITEMS.reduce(
      (acc: IPrice, item: IDetailedItem) => {
        const newTotalPrice = acc.totalPrice + item.price * item.quantity;
        return {
          totalPrice: newTotalPrice,
          shippingFee: newTotalPrice > 300000 ? 0 : 20000,
        };
      },
      { totalPrice: 0, shippingFee: 0 },
    );
  }, [DETAILED_CART_ITEMS]);

  const [isDelivery, setIsDelivery] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const onFinish = (value: any) => {
    console.log(value);
  };

  if (cartItems.length <= 0) {
    toast(t('your cart is currently empty, you cannot access checkout page'), toastConfig('error'));
    return <Navigate to="/cart" />;
  }

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#1a1a1a' } }}
      children={
        <div className="checkout-page">
          <div className="abs-btns">
            <Tooltip title={t('toggle theme')}>
              <Switch checked={theme === 'dark'} onChange={() => dispatch(setTheme())} checkedChildren="Dark" unCheckedChildren="Light" />
            </Tooltip>
            <Tooltip title={t('change language')}>
              {i18n.resolvedLanguage === 'en' && (
                <Avatar onClick={() => i18n.changeLanguage('vi')} src="/en.jpg" style={{ cursor: 'pointer' }}></Avatar>
              )}
              {i18n.resolvedLanguage === 'vi' && (
                <Avatar onClick={() => i18n.changeLanguage('en')} src="/vn.jpg" style={{ cursor: 'pointer' }}></Avatar>
              )}
            </Tooltip>
          </div>

          <div className="container" style={containerStyle}>
            <div className="shipping-form-wrapper">
              <div className="shipping-form__logo">
                <img src="/appbar-logo.png" alt="logo" onClick={() => navigate('/')} />
              </div>
              <div className="shipping-form">
                <Form
                  layout="vertical"
                  validateTrigger="onSubmit"
                  onFinish={onFinish}
                  ref={formRef}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: t('required').toString() },
                      { whitespace: true, message: t('required').toString() },
                    ]}
                  >
                    <Input size="large" spellCheck={false} placeholder={t('your name...').toString()} style={inputStyle} />
                  </Form.Item>

                  <Radio.Group
                    onChange={e => setIsDelivery(e.target.value)}
                    value={isDelivery}
                    style={{ marginBottom: 24 }}
                    name="radiogroup"
                    size="large"
                  >
                    <Space direction="vertical">
                      <Radio value={false}>{t('pick up at shop')}</Radio>
                      <Radio value={true}>{t('delivery')}</Radio>
                    </Space>
                  </Radio.Group>

                  {isDelivery && (
                    <>
                      <Form.Item
                        name="phoneNumber"
                        rules={[
                          { required: true, message: t('required').toString() },
                          {
                            pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: t('invalid phone number').toString(),
                          },
                        ]}
                      >
                        <Input size="large" placeholder={t('phone number...').toString()} style={inputStyle} />
                      </Form.Item>
                      <Form.Item
                        name="address"
                        rules={[
                          { required: true, message: t('required').toString() },
                          { whitespace: true, message: t('required').toString() },
                        ]}
                      >
                        <Input size="large" spellCheck={false} placeholder={t('address...').toString()} style={inputStyle} />
                      </Form.Item>
                    </>
                  )}
                  <Space align="center" style={{ width: '100%', marginTop: 'auto', justifyContent: 'space-between' }}>
                    <div onClick={() => navigate('/cart')} style={{ fontSize: '1rem', cursor: 'pointer' }}>
                      {`< ${t('back to cart')}`}
                    </div>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button size="large" type="primary" htmlType="submit" className="submit-btn">
                        {t('checkout')}
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              </div>
              <Divider style={{ marginTop: 56, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
              <div className="shipping-form__footer">
                <span>{t('return')}</span>
                <span>{t('terms of delivery')}</span>
                <span>{t('information security')}</span>
                <span>{t('terms of use')}</span>
                <span>{t('contact info')}</span>
              </div>
            </div>

            <div className="cart-items">
              {DETAILED_CART_ITEMS.map((item: IDetailedItem) => (
                <div key={item.productId} className="checkout-cart-item">
                  <Badge count={item.quantity} color="rgba(115, 115, 115, 0.9)">
                    <div className="item-image">
                      <Image src={item.image} />
                    </div>
                  </Badge>
                  <div className="item-name">
                    <h4 style={{ margin: '0 0 8px', fontWeight: 700 }}>{item.name}</h4>
                    <span>{`${(item.price * 1).toLocaleString('en-US')} /1`}</span>
                  </div>
                  <div className="item-price">{`₫${(item.price * item.quantity).toLocaleString('en-US')}`}</div>
                </div>
              ))}
              <Divider style={{ borderColor: 'rgba(26, 26, 26, 0.12)' }} />
              <Space size={14} style={{ width: '100%', justifyContent: 'space-between' }}>
                <Input placeholder={t('gift or discount code...').toString()} style={inputStyle} />
                <Button type="primary" className="submit-coupon-btn">
                  {t('apply')}
                </Button>
              </Space>
              <Divider style={{ borderColor: 'rgba(26, 26, 26, 0.12)' }} />
              <div className="display-price">
                <span>{t('subtotal')}</span>
                <span style={{ fontWeight: 500 }}>{`₫${totalPrice.toLocaleString('en-US')}`}</span>
              </div>
              <div className="display-price">
                <span>
                  {t('shipping fee')} <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                </span>
                <span style={{ fontWeight: 500 }}>{`₫${shippingFee.toLocaleString('en-US')}`}</span>
              </div>
              <Divider style={{ borderColor: 'rgba(26, 26, 26, 0.12)' }} />
              <div className="display-price">
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>{t('total')}:</span>
                <span>
                  <span style={{ marginRight: 9, fontSize: '0.75rem' }}>VND</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>{`₫${(totalPrice + shippingFee).toLocaleString('en-US')}`}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CheckoutPage;
