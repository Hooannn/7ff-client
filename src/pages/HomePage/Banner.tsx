import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getI18n, useTranslation } from 'react-i18next';
import { Button, Carousel } from 'antd';
import { containerStyle } from '../../assets/styles/globalStyle';

const BANNER_CAROUSEL_CONTENT = [
  {
    title: {
      en: '7 Fast Food restaurant',
      vi: 'Nhà hàng 7 Fast Food',
    },
    description: {
      en: 'Với 7 tiêu chí đã đề ra, sự  bảo đảm cho từng đơn đặt hàng cho khách, các đầu bếp và nhân viên thông qua tuyển chọn kỹ lưỡng, cùng với sự đa dạng của các món ăn 7FF hứa hẹn sẽ mang đến cho quý khách những sự lựa chọn tốt nhất.',
      vi: 'Với 7 tiêu chí đã đề ra, sự  bảo đảm cho từng đơn đặt hàng cho khách, các đầu bếp và nhân viên thông qua tuyển chọn kỹ lưỡng, cùng với sự đa dạng của các món ăn 7FF hứa hẹn sẽ mang đến cho quý khách những sự lựa chọn tốt nhất.',
    },
    buttonTitle: 'learn more about us',
    btnNavigation: '/about',
  },
  {
    title: {
      en: 'Enjoy every bite !',
      vi: 'Tận hưởng từng miếng cắn !',
    },
    description: {
      en: '7 Fast Food specializes in snacks and popular fast foods.\nWe also serve hot trending dishes on social media platforms, as well as cooling teas that are both refreshing and have many health benefits.',
      vi: '7 Fast Food chuyên về các món ăn vặt và các loại đồ ăn nhanh phố biến.\nChúng tôi còn có các món hot trend trên các nền tảng mạng xã hội, cũng như các loại trà giải nhiệt vừa giúp giải khát lại có nhiều lợi ích cho sức khỏe.',
    },
    buttonTitle: 'see the menu',
    btnNavigation: '/menu',
  },
  {
    title: {
      en: 'This month best seller',
      vi: 'Best seller tháng này',
    },
    description: {
      en: 'Rolled rice paper\nSuper delicious rice paper rolls with quail eggs, with a standard flavor outside the store will surely make you fall in love with the perfect blend of sweet and sour taste.',
      vi: 'Bánh tráng cuốn\nBánh tráng cuốn trứng cút siêu ngon, với hương vị chuẩn ngoài hàng chắc chắn sẽ khiến bạn thích mê với hương vị chua ngọt hòa quyện hoàn hảo.',
    },
    buttonTitle: 'see details',
    btnNavigation: '/product/64400cbe683d6780bbf7a5e0',
  },
];

const Banner: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';

  return (
    <section className="banner">
      <img src="/hero-banner.jpg" className="banner-img" />
      <div className="container" style={containerStyle}>
        <Carousel className="carousel" autoplay>
          {BANNER_CAROUSEL_CONTENT.map((item, i) => (
            <div key={i} className="carousel-item-wrapper">
              <div className="carousel-item">
                <h1 className="header">{item.title[locale]}</h1>
                {item.description[locale].split('\n').map((prg, _i) => (
                  <span key={_i} className="description">
                    {prg}
                  </span>
                ))}
                <Button type="primary" shape="round" size="large" className="order-btn" onClick={() => navigate(item.btnNavigation)}>
                  {t(item.buttonTitle)}
                </Button>
              </div>
            </div>
          ))}
          {/* <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">Nhà Hàng 7 Fast Food</h1>
              <span className="description">
                Với 7 tiêu chí đã đề ra, sự bảo đảm cho từng đơn đặt hàng cho khách, các đầu bếp và nhân viên thông qua tuyển chọn kỹ lưỡng, cùng với
                sự đa dạng của các món ăn 7FF hứa hẹn sẽ mang đến cho quý khách những sự lựa chọn tốt nhất.
              </span>
              <Button type="primary" shape="round" size="large" className="order-btn" onClick={() => navigate('/about')}>
                {t('learn more about us')}
              </Button>
            </div>
          </div>
          <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">This Month Best Seller</h1>
              <span className="description">Chúng tôi chuyên kinh doanh ...</span>
              <Button type="primary" shape="round" size="large" className="order-btn" onClick={() => navigate('/menu')}>
                {t('see the menu')}
              </Button>
            </div>
          </div>
          <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">Summer Promotion Event</h1>
              <span className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consectetur ab veniam. Architecto impedit eligendi eius sit nam
                necessitatibus placeat eum soluta distinctio tempore laborum neque amet maxime, autem nemo!
              </span>
              <Button type="primary" shape="round" size="large" className="order-btn">
                {t('order now')}
              </Button>
            </div>
          </div> */}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
