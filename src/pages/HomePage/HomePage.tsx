import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/pages/HomePage.css';
import Banner from './Banner';
import SaleOff from './SaleOff';
import Feedback from './Feedback';
import Menu from '../../components/Menu';
import AboutUs from '../../components/AboutUs';
import BookingTable from '../../components/BookingTable';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../slices/app.slice';
import { useEffect } from 'react';

export default function RootRoute() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useTitle(`${t('home')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab('home'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <Banner />
      <SaleOff />
      <Menu />
      <AboutUs />
      <BookingTable />
      <Feedback />
    </div>
  );
}
