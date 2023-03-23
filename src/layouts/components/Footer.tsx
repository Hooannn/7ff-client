import { FC } from 'react';
import { Layout } from 'antd';
import '../../assets/styles/Footer.css';
import { containerStyle } from '../../assets/styles/globalStyle';
import { useTranslation } from 'react-i18next';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, UsergroupAddOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout.Footer className="footer">
      <div className="container" style={containerStyle}>
        <div className="footer-row">
          <div className="footer-col opening-hours">
            <h4 className="heading">{t('opening hours')}</h4>
            <span className="text">10.00 Am -10.00 Pm</span>
            <span className="text">{t('everyday')}</span>
          </div>
          <div className="footer-col social-platforms">
            <h4 className="heading">7FF - 2023</h4>
            <span className="text">
              Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
            </span>
            <div className="social-links">
              <FacebookOutlined className="social-link" style={{ fontSize: '1.5rem' }} />
              <InstagramOutlined className="social-link" style={{ fontSize: '1.5rem' }} />
              <YoutubeOutlined className="social-link" style={{ fontSize: '1.5rem' }} />
            </div>
          </div>
          <div className="footer-col contact-us">
            <h4 className="heading">{t('contact us')}</h4>
            <div className="contact-box">
              {t('recruitment')}
              <UsergroupAddOutlined />
            </div>
            <div className="contact-box">
              (+84) 913.283.xxx
              <PhoneOutlined />
            </div>
            <div className="contact-box">
              demo@gmail.com
              <MailOutlined />
            </div>
          </div>
        </div>
        <p className="copyright">© 2023 {t('all rights reserved by 7FF')}</p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
