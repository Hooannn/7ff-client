import { FC } from 'react';
import { Button } from 'antd';
import { containerStyle } from '../assets/styles/globalStyle';
import { getI18n, useTranslation } from 'react-i18next';
import '../assets/styles/components/AboutUs.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isAboutPage?: boolean;
}

const STORY = {
  brief: {
    en: '7FF stands for Seven Fast Food, the name is derived from a group of startups with 7 criteria: Prestige, quality, dedicated service, quick delivery, delicious food, meeting food safety standards products, reasonable prices...',
    vi: '7FF là viết tắt của Seven Fast Food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm và giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến...',
  },
  full: {
    en: '7FF stands for Seven Fast Food, the name is derived from a group of startups with 7 criteria: Prestige, quality, dedicated service, quick delivery, delicious food, meeting food safety standards products, reasonable prices. 7FF sells mainly junk food and some popular fast food.\nCurrently, the headquarters of 7FF is in Xuan Thoi Son commune, Hoc Mon district, Ho Chi Minh city, Vietnam. Along with that, there are 7 branches present in major cities, with more than 7000 orders served every day.',
    vi: '7FF là viết tắt của Seven Fast Food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm và giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến.\nHiện tại, trụ sở chính của 7FF ở xã Xuân Thới Sơn, huyện Hóc Môn, thành phố Hồ Chí Minh, Việt Nam. Cùng với đó là 7 chi nhánh có mặt ở các thành phố lớn, với hơn 7000 đơn được phục vụ mỗi ngày.',
  },
};

const AboutUs: FC<IProps> = ({ isAboutPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';

  return (
    <section className="about-us">
      <div className="container" style={containerStyle}>
        <div className="image-wrapper">
          <img src="/about-img.png" />
        </div>
        <div className="story-wrapper">
          <h2 className="heading">{t('we are 7ff')}</h2>
          {isAboutPage ? (
            <>
              {STORY.full[locale].split('\n').map((prg: string, i: number) => (
                <p className="story">{prg}</p>
              ))}
            </>
          ) : (
            <>
              <p className="story">{STORY.brief[locale]}</p>
              <Button type="primary" shape="round" size="large" className="read-more-btn" onClick={() => navigate('/about')}>
                {t('read more')}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
