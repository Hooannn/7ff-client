import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../../assets/styles/globalStyle';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/pages/CartPage.css';
import { addToCart, decreaseCartItem, removeCartItem, setActiveTab } from '../../slices/app.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../@core/store';
import { IDetailedItem } from '../../types';
import { Button, ConfigProvider, Input, Progress, Table, Image, Space, Tooltip } from 'antd';
import { LockOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

const CartPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useTitle(`${t('cart')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab(null));
    window.scrollTo(0, 0);
  }, []);

  const cartItems = useSelector((state: RootState) => state.app.cartItems);

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
  const totalPrice = useMemo(() => {
    return DETAILED_CART_ITEMS.reduce((total: number, item: IDetailedItem) => {
      return (total += item.price * item.quantity);
    }, 0);
  }, [DETAILED_CART_ITEMS]);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#1a1a1a' } }}
      children={
        <div className="cart-page">
          <section className="container-wrapper">
            <div className="container" style={containerStyle}>
              <div className="heading-and-progress">
                <h2 className="heading">{t('my cart')}</h2>
                <div className="cart-progress">
                  {totalPrice < 300000 ? (
                    <>
                      <span>{t('buy')} </span>
                      <strong>{`₫${(300000 - totalPrice).toLocaleString('en-US')}`}</strong>
                      <span> {t('more to get free shipping')}</span>
                    </>
                  ) : (
                    <span>{t('your order is free shipping now')}</span>
                  )}
                  <Progress
                    percent={(totalPrice / 300000) * 100}
                    size="small"
                    showInfo={false}
                    strokeColor="#1a1a1a"
                    trailColor="rgba(26, 26, 26, 0.3)"
                    style={{ marginBottom: 0 }}
                  />
                </div>
              </div>

              <div className="cart-items-wrapper">
                <div className="cart-items">
                  <Table
                    pagination={false}
                    rowKey={(record: IDetailedItem) => record.productId}
                    columns={[
                      {
                        title: t('feature image'),
                        dataIndex: 'image',
                        width: 150,
                        render: (value: string) => {
                          return (
                            <div className="item-image">
                              <Image src={value} />
                            </div>
                          );
                        },
                      },
                      {
                        title: t("product's name"),
                        dataIndex: 'name',
                        render: (value: string) => {
                          return <strong>{value}</strong>;
                        },
                      },
                      {
                        title: t('unit price'),
                        dataIndex: 'price',
                        align: 'center',
                        width: 120,
                        render: (value: number) => {
                          return <span>{(value * 1).toLocaleString('en-US')} /1</span>;
                        },
                      },
                      {
                        title: t('quantity'),
                        dataIndex: 'quantity',
                        align: 'center',
                        width: 150,
                        render: (value: number, record: IDetailedItem) => {
                          return (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                              <Space.Compact className="item-quantity">
                                <Button type="text" onClick={() => dispatch(decreaseCartItem(record.productId))}>
                                  -
                                </Button>
                                <span>{value}</span>
                                <Button type="text" onClick={() => dispatch(addToCart(record.productId))}>
                                  +
                                </Button>
                              </Space.Compact>
                              <Tooltip title={t('delete item')} placement="bottom">
                                <Button
                                  type="primary"
                                  danger
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                  onClick={() => dispatch(removeCartItem(record.productId))}
                                />
                              </Tooltip>
                            </div>
                          );
                        },
                      },
                      {
                        title: t('total'),
                        align: 'center',
                        width: 120,
                        render: (value: any, record: IDetailedItem) => {
                          return <span>{(record.price * record.quantity).toLocaleString('en-US')}₫</span>;
                        },
                      },
                    ]}
                    dataSource={DETAILED_CART_ITEMS}
                  />
                </div>

                <div className="order-summary">
                  <div className="subtotal">
                    <span>{t('subtotal')}:</span>
                    <span>{`${totalPrice.toLocaleString('en-US')}₫`}</span>
                  </div>
                  <div className="total">
                    <span>{t('total')}:</span>
                    <span>{`${totalPrice.toLocaleString('en-US')} VND`}</span>
                  </div>
                  <p style={{ margin: '8px 0 0', color: 'rgba(26, 26, 26, 0.7)' }}>{t('VAT included, shipping fee not covered')}.</p>
                  <Input.TextArea placeholder={t('order notes...').toString()} autoSize={{ minRows: 4 }} className="order-notes" />
                  <Button type="primary" shape="round" block className="checkout-btn" onClick={() => navigate('/sales/checkout')}>
                    <LockOutlined />
                    {t('checkout')}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
};

export default CartPage;
