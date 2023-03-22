import { Carousel } from 'antd';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/HomePage.css';
import Banner from './Banner';

export default function RootRoute() {
  const { t } = useTranslation();
  useTitle(`${t('home')} - 7FF`);

  return (
    <div className="home-page">
      <Banner />
    </div>
  );
}
