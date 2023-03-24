import { FC, useEffect } from 'react';
import BookingTable from '../../components/BookingTable';
import '../../assets/styles/pages/BookingPage.css';
import useTitle from '../../hooks/useTitle';
import { useTranslation } from 'react-i18next';

const BookingPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('booking table')} - 7FF`);
  useEffect(() => {
    // setActiveTab('booking table')
  }, []);

  return (
    <div className="booking-page">
      <BookingTable />
    </div>
  );
};

export default BookingPage;
