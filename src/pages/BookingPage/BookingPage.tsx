import { FC, useEffect } from 'react';
import BookingTable from '../../components/BookingTable';
import '../../assets/styles/pages/BookingPage.css';
import useTitle from '../../hooks/useTitle';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../slices/app.slice';

const BookingPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useTitle(`${t('booking table')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab('booking table'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="booking-page">
      <BookingTable />
    </div>
  );
};

export default BookingPage;
