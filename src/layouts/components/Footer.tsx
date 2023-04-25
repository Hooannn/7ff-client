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
    en: 'Xuân Thới Sơn commune, Hóc Môn district, Hồ Chí Minh city',
    vi: 'Xã Xuân Thới Sơn, huyện Hóc Môn, thành phố Hồ Chí Minh',
  },
  socialInvitation: {
    en: 'Hey there fast food lovers! Keep your eye on our social media to not miss any attractive promotions. Give us a follow and stay tuned!',
    vi: 'Nếu bạn muốn biết thông tin về các chương trình khuyến mãi và các món ăn sắp được bán trong thời gian tới, hãy theo dõi chúng mình nha!',
  },
  contact: {
    email: 'sevenfastfood@gmail.com',
    phone: '(+84) 913.283.742',
  },
};

const Footer: FC = () => {
  const { t } = useTranslation();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';
  const year = new Date().getFullYear().toString();

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
            <h4 className="heading">7FF - {year}</h4>
            <span className="text">{FOOTER_CONTENT.socialInvitation[locale]}</span>
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
              {FOOTER_CONTENT.contact.phone}
              <PhoneOutlined />
            </div>
            <div className="contact-box">
              {FOOTER_CONTENT.contact.email}
              <MailOutlined />
            </div>
          </div>
        </div>
        <p className="copyright">
          &#169; {year} - {t('all rights reserved by 7FF')}
        </p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
