import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getI18n, useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Button, Divider, Empty, Modal, Row, Select, Skeleton, Image, Table } from 'antd';
import useTitle from '../../hooks/useTitle';
import useAxiosIns from '../../hooks/useAxiosIns';
import ProfileSidebar from '../../components/ProfileSidebar';
import type { IContent, OrderStatus } from '../../types';
import { IOrder, IResponseData } from '../../types';
import { RootState } from '../../@core/store';
import { containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/pages/ProfilePage.css';

const MyOrdersPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const axios = useAxiosIns();
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeStatus, setActiveStatus] = useState<OrderStatus | ''>('');
  const [sortOption, setSortOption] = useState('');
  const fetchOrdersQuery = useQuery(['my-orders', sortOption], {
    queryFn: () => axios.get<IResponseData<IOrder[]>>(`/my-orders/${user._id}?sort=${sortOption}`),
    enabled: true,
    refetchIntervalInBackground: true,
    refetchInterval: 5 * 60 * 1000,
    select: res => res.data,
  });
  const orders = fetchOrdersQuery.data?.data ?? [];
  useTitle(`${t('my orders')} - 7FF`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ORDER_STATUSES = ['Processing', 'Delivering', 'Done', 'Cancelled'];
  const MATCHING_ITEMS = orders.filter((order: IOrder) => order.status === activeStatus || activeStatus === '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeOrderId, setActiveOrderId] = useState<string>('');

  return (
    <div className="profile-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          <ProfileSidebar />

          <div className="my-orders">
            <div className="heading">{t('my orders')}</div>
            {fetchOrdersQuery.isLoading && <Skeleton />}

            {orders.length === 0 && !fetchOrdersQuery.isLoading && (
              <div className="empty-order">
                <div className="empty-order-discover">
                  <h2>{t("you don't have any orders")}</h2>
                  <h3>{t("let's start an order!")}</h3>
                  <Button size="large" shape="round" onClick={() => navigate('/menu')} className="start-order-btn">
                    {t('start order')}
                  </Button>
                </div>
              </div>
            )}

            {orders.length > 0 && !fetchOrdersQuery.isLoading && (
              <div>
                <div className="order-filter">
                  <div className="status-options">
                    {ORDER_STATUSES.map((status: string) => (
                      <div
                        key={status}
                        onClick={() => setActiveStatus(prev => (prev !== status ? (status as OrderStatus) : ''))}
                        className={`status-option-item ${activeStatus === status ? 'active' : ''}`}
                      >
                        {t(status.toLowerCase())}
                      </div>
                    ))}
                  </div>
                  <div className="sort-options">
                    <Select
                      placeholder={t('sort by...').toString()}
                      size="large"
                      style={{ width: 200 }}
                      dropdownStyle={{ padding: 5 }}
                      value={sortOption}
                      onChange={value => setSortOption(value)}
                    >
                      <Select.Option value="createdAt" className="sort-option-item">
                        {t('oldest orders')}
                      </Select.Option>
                      <Select.Option value="" className="sort-option-item">
                        {t('latest orders')}
                      </Select.Option>
                      <Select.Option value="totalPrice" className="sort-option-item">
                        {t('total order value')}
                      </Select.Option>
                      <Select.Option value="status" className="sort-option-item">
                        {t('order status')}
                      </Select.Option>
                    </Select>
                  </div>
                </div>
                <div className="order-list">
                  <Table
                    dataSource={MATCHING_ITEMS}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <p style={{ margin: '15px 0 0', fontSize: 15, fontWeight: 500, fontStyle: 'italic' }}>
                              {t('you have no order with status')}: {t(activeStatus.toLocaleLowerCase())}.
                            </p>
                          }
                        />
                      ),
                    }}
                    rowKey={(record: IOrder) => record._id as string}
                    columns={[
                      { title: t('order ID'), dataIndex: '_id', width: 210 },
                      {
                        title: t('order date'),
                        dataIndex: 'createdAt',
                        render: value => <span>{dayjs(value).format('DD/MM/YYYY HH:mm')}</span>,
                      },
                      {
                        title: t('quantity'),
                        dataIndex: 'items',
                        align: 'center',
                        render: (value: IOrder['items']) => {
                          const totalItems = value.reduce((acc: number, item: any) => {
                            return acc + item.quantity;
                          }, 0);
                          return <span>{`0${totalItems}`.slice(-2)}</span>;
                        },
                      },
                      {
                        title: t('total value'),
                        dataIndex: 'totalPrice',
                        align: 'center',
                      },
                      {
                        title: t('status'),
                        dataIndex: 'status',
                        width: 150,
                        align: 'center',
                        render: (value: OrderStatus) => <span className={`table-order-status ${value}`}>{t(value.toLocaleLowerCase())}</span>,
                      },
                      {
                        title: t('details'),
                        render: (_, record) => (
                          <Button
                            type="primary"
                            shape="round"
                            onClick={() => {
                              setActiveOrderId(record._id);
                              setOpenModal(true);
                            }}
                            style={{ fontWeight: 500 }}
                          >
                            {t('view')}
                          </Button>
                        ),
                      },
                    ]}
                    pagination={{ defaultPageSize: 4, showSizeChanger: false }}
                  ></Table>
                </div>
              </div>
            )}
          </div>

          {openModal && (
            <OrderDetailModal
              orderId={activeOrderId}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

interface IModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderDetailModal: FC<IModalProps> = ({ orderId, onClose }) => {
  const axios = useAxiosIns();
  const { t } = useTranslation();
  const locale = getI18n().resolvedLanguage as 'en' | 'vi';

  const getOrderDetailQuery = useQuery(['order-details'], {
    queryFn: () => axios.get(`/orders/${orderId}`),
    refetchOnWindowFocus: false,
    select: res => res.data,
  });
  const orderDetails = getOrderDetailQuery.data?.data;

  return (
    <Modal
      title={t('order details')}
      open
      onCancel={onClose}
      width={650}
      footer={[
        <Button key="close" type="primary" onClick={onClose} style={{ fontWeight: 500 }} className="order-details-rating-btn">
          {t('review')}
        </Button>,
        <Button key="close" type="primary" onClick={onClose} disabled={!orderDetails} style={{ fontWeight: 500 }}>
          {t('close')}
        </Button>,
      ]}
    >
      {getOrderDetailQuery.isLoading ? (
        <Skeleton />
      ) : orderDetails ? (
        <div className="order-details">
          <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
          <Table
            dataSource={orderDetails.items}
            pagination={false}
            rowKey={record => record.product._id}
            columns={[
              {
                title: t("product's name"),
                dataIndex: 'product',
                width: 240,
                render: value => <span>{value.name[locale]}</span>,
              },
              {
                title: t('quantity'),
                dataIndex: 'quantity',
                align: 'center',
                render: value => <span>{`0${value}`.slice(-2)}</span>,
              },
              {
                title: t('current price'),
                dataIndex: 'product',
                align: 'center',
                render: value => <span>{value.price}</span>,
              },
              {
                title: `${t('availability')}?`,
                dataIndex: 'product',
                align: 'center',
                render: value => <span>{value.isAvailable ? t('yes') : t('no')}</span>,
              },
            ]}
          />
          <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
          <Row justify="space-between" align="middle">
            <span className="bold-text">{t('order date')}:</span>
            <span>{dayjs(orderDetails.createdAt).format('DD/MM/YYYY HH:mm')}</span>
          </Row>
          <Row justify="space-between" align="middle">
            <span className="bold-text">{t('last time status updated')}:</span>
            <span>{dayjs(orderDetails.updatedAt).format('DD/MM/YYYY HH:mm')}</span>
          </Row>
          <Row justify="space-between" align="middle">
            <span className="bold-text">{t('total price (shipping included)')}:</span>
            <span className="bold-text">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDetails.totalPrice)}
            </span>
          </Row>
          {orderDetails.isDelivery && (
            <>
              <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
              <Row justify="space-between" align="middle">
                <span className="bold-text">{t('delivery phone number')}:</span>
                <span>{orderDetails.deliveryPhone}</span>
              </Row>
              <Row justify="space-between" align="middle">
                <span className="bold-text">{t('delivery address')}:</span>
                <span>{orderDetails.deliveryAddress}</span>
              </Row>
            </>
          )}
          <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
        </div>
      ) : (
        <div>
          <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
          <p style={{ marginBlock: 50, color: 'rgba(0, 0, 0, 0.25)', textAlign: 'center', fontWeight: 500, fontStyle: 'italic' }}>
            {t('cannot find information for the order with ID')}: {orderId}
          </p>
          <Divider style={{ margin: '12px 0', borderWidth: 2, borderColor: 'rgba(26, 26, 26, 0.12)' }} />
        </div>
      )}
    </Modal>
  );
};

export default MyOrdersPage;
