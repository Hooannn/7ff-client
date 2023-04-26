import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Button, Empty, Select, Skeleton, Table } from 'antd';
import useTitle from '../../hooks/useTitle';
import useAxiosIns from '../../hooks/useAxiosIns';
import ProfileSidebar from '../../components/ProfileSidebar';
import type { OrderStatus } from '../../types';
import { IOrder, IResponseData } from '../../types';
import { RootState } from '../../@core/store';
import { containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/pages/ProfilePage.css';

const MyOrdersPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const axios = useAxiosIns();
  const user = useSelector((state: RootState) => state.auth.user);
  // const [orders, setOrders] = useState<IOrder[]>([]);
  const [activeStatus, setActiveStatus] = useState<OrderStatus | ''>('');
  const [sortOption, setSortOption] = useState('');
  const fetchOrdersQuery = useQuery(['my-orders', sortOption], {
    queryFn: () => axios.get<IResponseData<IOrder[]>>(`/my-orders/${user._id}?sort=${sortOption}`),
    enabled: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
  });
  const orders = fetchOrdersQuery.data?.data?.data;
  useTitle(`${t('my orders')} - 7FF`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ORDER_STATUSES = ['Processing', 'Delivering', 'Done', 'Cancelled'];
  const MATCHING_ITEMS = orders?.filter((order: IOrder) => order.status === activeStatus || activeStatus === '');

  return (
    <div className="profile-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          <ProfileSidebar />

          <div className="my-orders">
            <div className="heading">{t('my orders')}</div>
            {fetchOrdersQuery.isLoading && <Skeleton />}

            {orders?.length === 0 && !fetchOrdersQuery.isLoading && (
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

            {orders?.length && !fetchOrdersQuery.isLoading && (
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
                        render: () => (
                          <Button type="primary" shape="round" style={{ fontWeight: 500 }}>
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
        </div>
      </section>
    </div>
  );
};

export default MyOrdersPage;
