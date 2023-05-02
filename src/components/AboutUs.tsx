import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getI18n, useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { containerStyle } from '../assets/styles/globalStyle';
import '../assets/styles/components/AboutUs.css';

interface IProps {
  isAboutPage?: boolean;
}

const STORY = {
  brief: {
    en: 'Started as a startup project aiming to bring the best dining experience to everyone, creating a brand with validity, quality, good service, fast delivery with our exquisite, safe and affordable fast food, 7FF (short for 7 Fast Food) is a food chain that specialize in providing refreshment and snack as well as conventional fast food...',
    vi: '7FF là viết tắt của Seven Fast Food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm và giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến...',
  },
  fullPart01: {
    en: 'Started as a startup project aiming to bring the best dining experience to everyone, creating a brand with validity, quality, good service, fast delivery with our exquisite, safe and affordable fast food, 7FF (short for 7 Fast Food) is a food chain that specialize in providing refreshment and snack as well as conventional fast food.\nWe are aiming to broaden our reach from the Xuân Thới Sơn commune, Hóc Môn District, Hồ Chí Minh City main restaurant and so far, have successfully open 7 brand restaurant in major cities, serving more than 7 thousand of customers everyday.',
    vi: '7FF là viết tắt của Seven Fast Food, cái tên được bắt nguồn từ một nhóm khởi nghiệp với 7 tiêu chí là: Uy tín, chất lượng, phục vụ tận tình, giao hàng nhanh chóng, món ăn ngon, đạt chuẩn an toàn thực phẩm, giá cả hợp lý. 7FF bán chủ yếu là đồ ăn vặt và một số thức ăn nhanh phổ biến.\nHiện tại, trụ sở chính của 7FF  ở Xuân Thới Sơn, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam. Cùng với đó là 7 chi nhánh có mặt ở các thành phố lớn, với hơn 7000 đơn được phục vụ mỗi ngày.',
  },
  fullPart02: {
    en: '"Yêu là phải nói, như đói là phải ăn !"\nIn order to bring you the best dining experience, our staff members all have been carefully selected and trained to provide the premium quality meals and service in our restaurant.\nWe are always aware of customers’ evolving tastes. That’s why on top of ensuring only the best quality food are being serve to our customers, our fast food selection always changing and constantly bringing new flavor to the menu, satisfying all your dining needs.',
    vi: '"Yêu là phải nói, như đói là phải ăn !"\nNhằm đem đến trải nghiệm tốt nhất cho khách hàng, tất cả nhân viên trong đội ngũ của 7FF đều được tuyển chọn và đào tạo kỹ lưỡng để có thể đảm bảo được chất lượng của món ăn và chất lượng phục vụ.\nNgoài việc chú trọng hương vị của thức ăn, 7FF còn hướng đến cho khách hàng nhiều sự lựa chọn, với mong muốn đáp ứng các nhu cầu ăn vặt của khách hàng. Thay đổi, bức phá, đáp ứng thị hiếu của khách hàng luôn là mục tiêu mà 7FF hướng tới.',
  },
  fullPart03: {
    en: '7FF is a brand created by a group of students starting a career with 4 members. The starting point of 7FF was a small snack shop, which had not received the attention of customers. The number of clients and orders per day were very low. 7FF in the early days of its establishment encountered many difficulties, such as: Lack of investment capital, operating experience, service quality and even the variety of products.\nWith the above difficulties. 7FF had to go through a period of crisis, but with the perseverance, learning and research of 7FF members, we have overcome the difficult period and are now in the top 20 most popular snack brands in the country.',
    vi: '7FF là thương hiệu do một nhóm sinh viên lập nghiệp gồm 4 thành viên xây dựng nên. Xuất phát điểm của 7FF là một cửa hàng đồ ăn vặt nhỏ, chưa nhận được sự quan tâm của khách hàng. Số lượng khách hàng và đơn hàng mỗi ngày đều ở mức rất thấp. 7FF của những ngày mới thành lập vấp phải rất nhiều khó khăn, có thể kể đến như: Thiếu vốn đầu tư, kinh nghiệm vận hành, chất lượng dịch vụ và kể cả sự đa dạng trong thực đơn.\nVới những khó khăn trên 7FF đã phải trải qua một giai đoạn khủng hoảng, nhưng với sự kiên trì, sự học hỏi và nghiên cứu của các thành viên 7FF đã vượt qua giai đoạn khó khăn và hiện nay đang nằm trong top 20 thương hiệu đồ ăn vặt phổ biến nhất cả nước.',
  },
  fullPart03: {
    en: 'In order to bring you the best dining experience, our staff members all have been carefully selected and trained to provide the premium quality meals and service in our restaurant.\nWe are always aware of customers’ evolving tastes. That’s why on top of ensuring only the best quality food are being serve to our customers, our fast food selection always changing and constantly bringing new flavor to the menu, satisfying all your dining needs.',
    vi: 'Nhằm đem đến trải nghiệm tốt nhất cho khách hàng, tất cả nhân viên trong đội ngũ của 7FF đều được tuyển chọn và đào tạo kỹ lưỡng để có thể đảm bảo được chất lượng của món ăn và chất lượng phục vụ.\n7FF luôn hướng tới sự đa dạng của thực đơn, ngoài việc đảm bảo mùi vị của thức ăn còn giúp cho khách hàng có nhiều sự lựa chọn, đáp ứng hầu hết mọi nhu cầu ăn vặt của khách hàng. Đa dạnh hóa thực đơn để mang đến sự phục vụ tốt hơn đến với khách hàng là một trong các mục tiêu mà 7FF hướng tới.',
  },
};

const AboutUs: FC<IProps> = ({ isAboutPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';

  return (
    <section className="about-us">
      {isAboutPage ? (
        <>
          <div className="container" style={containerStyle}>
            <div className="image-wrapper">
              <img src="/about-img.png" />
            </div>
            <div className="story-wrapper">
              <h2 className="heading">{t('we are 7ff')}</h2>
              {STORY.fullPart01[locale].split('\n').map((prg: string, i: number) => (
                <p className="story" key={i}>
                  {prg}
                </p>
              ))}
            </div>
          </div>
          <div className="container" style={{ ...containerStyle, marginTop: -40 }}>
            <div className="story-wrapper">
              <h2 className="heading">{t('just a message from 7ff')} ...</h2>
              {STORY.fullPart02[locale].split('\n').map((prg: string, i: number) => (
                <p className="story" key={i}>
                  {prg}
                </p>
              ))}
            </div>
            <div className="image-wrapper">
              <img src="/about-img-2.png" style={{ width: 420 }} />
            </div>
          </div>
          <div className="container" style={{ ...containerStyle, marginTop: -24 }}>
            <div className="image-wrapper">
              <img src="/about-img-3.png" />
            </div>
            <div className="story-wrapper">
              <h2 className="heading">{t('start-up story of 7ff')}</h2>
              {STORY.fullPart03[locale].split('\n').map((prg: string, i: number) => (
                <p className="story" key={i}>
                  {prg}
                </p>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="container" style={containerStyle}>
          <div className="image-wrapper">
            <img src="/about-img.png" />
          </div>
          <div className="story-wrapper">
            <h2 className="heading">{t('we are 7ff')}</h2>
            <p className="story">{STORY.brief[locale]}</p>
            <Button type="primary" shape="round" size="large" className="read-more-btn" onClick={() => navigate('/about')}>
              {t('read more')}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
