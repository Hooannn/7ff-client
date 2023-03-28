import { FC } from 'react';
import { Button } from 'antd';
import { containerStyle } from '../assets/styles/globalStyle';
import { useTranslation } from 'react-i18next';
import '../assets/styles/components/AboutUs.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isAboutPage?: boolean;
}

const AboutUs: FC<IProps> = ({ isAboutPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="about-us">
      <div className="container" style={containerStyle}>
        <div className="image-wrapper">
          <img src="/about-img.png" />
        </div>
        <div className="story-wrapper">
          <h2 className="heading">{t('we are 7ff')}</h2>
          <p className="story">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text. All
          </p>
          {!isAboutPage && (
            <Button type="primary" shape="round" size="large" className="read-more-btn" onClick={() => navigate('/about')}>
              {t('read more')}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
