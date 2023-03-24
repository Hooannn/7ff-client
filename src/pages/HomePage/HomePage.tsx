import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/pages/HomePage.css';
import Banner from './Banner';
import SaleOff from './SaleOff';
import Feedback from './Feedback';
import Menu from '../../components/Menu';
import AboutUs from '../../components/AboutUs';
import BookingTable from '../../components/BookingTable';

export default function RootRoute() {
  const { t } = useTranslation();
  useTitle(`${t('home')} - 7FF`);

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
