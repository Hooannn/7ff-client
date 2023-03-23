import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/HomePage.css';
import Banner from './Banner';
import SaleOff from './SaleOff';
import Menu from '../../components/Menu';
import AboutUs from './AboutUs';

export default function RootRoute() {
  const { t } = useTranslation();
  useTitle(`${t('home')} - 7FF`);

  return (
    <div className="home-page">
      <Banner />
      <SaleOff />
      <Menu noPaddingTop />
      <AboutUs />
    </div>
  );
}
