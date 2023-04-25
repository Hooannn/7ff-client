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
    en: 'Started as a startup project aiming to bring the best dining experience to everyone, creating a brand with validity, quality, good service, fast delivery with our exquisite, safe and affordable fast food, 7FF (short for 7 Fast Food) is a food chain that specialize in providing refreshment and snack as well as conventional fast food...',
    vi: '7FF là viết tắt của Seven Fast Food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm và giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến...',
  },
  full: {
    en: 'Started as a startup project aiming to bring the best dining experience to everyone, creating a brand with validity, quality, good service, fast delivery with our exquisite, safe and affordable fast food, 7FF (short for 7 Fast Food) is a food chain that specialize in providing refreshment and snack as well as conventional fast food.\nWe are aiming to broaden our reach from the Xuân Thới Sơn commune, Hóc Môn District, Hồ Chí Minh City main restaurant and so far, have successfully open 7 brand restaurant in major cities, serving more than 7 thousand of customers everyday.\nIn order to bring you the best dining experience, our chefs and staffs all have been carefully selected and trained to provide the premium quality meals and service in our restaurant.\nWe are always aware of customers’ evolving tastes. That’s why on top of ensuring only the best quality food are being serve to our customers, our fast food selection always changing and constantly bringing new flavor to the menu, satisfying all your dining needs.',
    vi: '7FF là viết tắt của Seven fast food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm, giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến.\nHiện tại, trụ sở chính của 7FF  ở Xuân Thới Sơn, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam. Cùng với đó là 7 chi nhánh có mặt ở các thành phố lớn, với hơn 7000 đơn được phục vụ mỗi ngày.\nNhằm đem đến trải nghiệm tốt nhất cho khách hàng, tất cả các đầu bếp và nhân viên của 7FF đều được tuyển chọn và đào tạo kỹ lưỡng để có thể đảm bảo được chất lượng của món ăn và chất lượng phục vụ.\n7FF luôn hướng tới sự đa dạng của thực đơn, ngoài việc đảm bảo mùi vị của thức ăn còn giúp cho khách hàng có nhiều sự lựa chọn, đáp ứng hầu hết mọi nhu cầu ăn vặt của khách hàng. Đa dạnh hóa thực đơn để mang đến sự phục vụ tốt hơn đến với khách hàng là một trong các mục tiêu mà 7FF hướng tới.',
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
