import { FC, useEffect } from 'react';
import AboutUs from '../../components/AboutUs';
import '../../assets/styles/pages/AboutPage.css';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../slices/app.slice';

const AboutPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useTitle(`${t('about us')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab('about us'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <AboutUs isAboutPage />
    </div>
  );
};

export default AboutPage;
