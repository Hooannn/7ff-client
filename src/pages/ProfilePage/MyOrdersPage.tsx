import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import ProfileSidebar from '../../components/ProfileSidebar';
import { IOrder } from '../../types';
import { RootState } from '../../@core/store';
import { containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/pages/ProfilePage.css';
import { Button } from 'antd';

// Fake data
// const orders: IOrder[] = [
//   {
//     _id: 'orders0001',
//     customerId: '123123',
//     status: 'Done',
//     items: [],
//     isDelivery: false,
//     totalPrice: 100000,
//   },
//   {
//     _id: 'orders0002',
//     customerId: '123123',
//     status: 'Processing',
//     items: [],
//     isDelivery: false,
//     totalPrice: 200000,
//   },
//   {
//     _id: 'orders0003',
//     customerId: '123123',
//     status: 'Cancelled',
//     items: [],
//     isDelivery: true,
//     totalPrice: 300000,
//   },
//   {
//     _id: 'orders0004',
//     customerId: '123123',
//     status: 'Delivering',
//     items: [],
//     isDelivery: true,
//     totalPrice: 400000,
//   },
// ];

const MyOrdersPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orders }: { orders: IOrder[] } = useSelector((state: RootState) => state.auth.user?.orders);

  useTitle(`${t('change password')} - 7FF`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          <ProfileSidebar />

          <div className="my-orders">
            <div className="heading">{t('my orders')}</div>
            {!orders || orders.length === 0 ? (
              <div className="empty-order">
                <div className="empty-order-discover">
                  <h2>{t("you don't have any orders")}</h2>
                  <h3>{t("let's start an order!")}</h3>
                  <Button size="large" shape="round" onClick={() => navigate('/menu')} className="start-order-btn">
                    {t('start order')}
                  </Button>
                </div>
              </div>
            ) : (
              <div>orders</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrdersPage;
