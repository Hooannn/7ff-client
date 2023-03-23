import { FC } from 'react';
import { Button } from 'antd';
import { containerStyle } from '../../assets/styles/globalStyle';
import { useTranslation } from 'react-i18next';

const AboutUs: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about-us">
      <div className="container" style={containerStyle}>
        <div className="image-wrapper">
          <img src="/about-img.png" />
        </div>
        <div className="story-wrapper">
          <h2 className="heading">We are 7ff</h2>
          <p className="story">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything embarrassing hidden in the middle of text. All
          </p>
          <Button type="primary" shape="round" size="large" className="read-more-btn">
            {t('read more')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
