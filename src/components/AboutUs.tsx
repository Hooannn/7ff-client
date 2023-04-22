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
    en: "7FF stands for Seven fast food, the name is derived from a group of startups with 7 criteria: Prestige, quality, dedicated service, fast delivery, delicious food, food safety standards products, reasonable prices. 7FF sells mainly junk food and some popular fast food.\nCurrently, the headquarters of 7FF is in Xuan Thoi Son, Hoc Mon, Ho Chi Minh City, Vietnam. Along with that, there are 7 branches present in major cities, with more than 7000 orders served every day.\n7FF is known for its familiar and popular snacks. All chefs and staff of 7FF are carefully selected and trained to ensure the quality of food and service.\n7FF always aims at the diversity of the menu, in addition to ensuring the taste of the food, it also helps customers have many choices, meeting almost all snacking needs of customers. Diversifying the menu to bring better service to customers is one of 7FF's goals.",
    vi: '7FF là viết tắt của Seven fast food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm, giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến.\nHiện tại, trụ sở chính của 7FF  ở Xuân Thới Sơn, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam. Cùng với đó là 7 chi nhánh có mặt ở các thành phố lớn, với hơn 7000 đơn được phục vụ mỗi ngày.\n7FF được biết đến với các món ăn vặt quen thuộc và phổ biến. Tất cả các đầu bếp và nhân viên của 7FF đều được tuyển chọn và đào tạo kỹ lưỡng để có thể đảm bảo được chất lượng của món ăn và chất lượng phục vụ.\n7FF luôn hướng tới sự đa dạng của thực đơn, ngoài việc đảm bảo mùi vị của thức ăn còn giúp cho khách hàng có nhiều sự lựa chọn, đáp ứng hầu hết mọi nhu cầu ăn vặt của khách hàng. Đa dạnh hóa thực đơn để mang đến sự phục vụ tốt hơn đến với khách hàng là một trong các mục tiêu mà 7FF hướng tới.',
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
                <p className="story" key={i}>
                  {prg}
                </p>
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
