import { FC, useEffect } from 'react';
import AboutUs from '../../components/AboutUs';
import '../../assets/styles/pages/AboutPage.css';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';

const AboutPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('about us')} - 7FF`);
  useEffect(() => {
    // setActiveTab('about us');
  }, []);

  return (
    <div className="about-page">
      <AboutUs />
    </div>
  );
};

export default AboutPage;
