import { FC } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, UsergroupAddOutlined, YoutubeOutlined } from '@ant-design/icons';
import { containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/components/Footer.css';

const FOOTER_CONTENT = {
  openingHours: {
    en: '10.00 Am - 10.00 Pm',
    vi: '10:00 Sáng - 10:00 Tối',
  },
  address: {
    en: 'Xuan Thoi Son commune, Hoc Mon district, Ho Chi Minh city',
    vi: 'Xã Xuân Thới Sơn, huyện Hóc Môn, thành phố Hồ Chí Minh',
  },
};

const Footer: FC = () => {
  const { t } = useTranslation();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';

  return (
    <Layout.Footer className="footer">
      <div className="container" style={containerStyle}>
        <div className="footer-row">
          <div className="footer-col opening-hours">
            <h4 className="heading">{t('opening hours')}</h4>
            <span className="text">{FOOTER_CONTENT.openingHours[locale]}</span>
            <span className="text">{t('everyday')}</span>
            <span
              className="text address"
              style={{ width: 250 }}
              onClick={() => window.open('https://goo.gl/maps/6RKi8R13P296uq2z7', '_blank', 'noopener,noreferrer')}
            >
              {FOOTER_CONTENT.address[locale]}
            </span>
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
              (+84) 913.283.742
              <PhoneOutlined />
            </div>
            <div className="contact-box">
              sevenfastfood@gmail.com
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
