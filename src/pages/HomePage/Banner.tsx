import { FC } from 'react';
import { Carousel } from 'antd';
import { containerStyle } from '../../assets/styles/globalStyle';

const Banner: FC = () => {
  return (
    <section className="banner">
      <img src="/hero-banner.jpg" className="banner-img" />
      <div className="container" style={containerStyle}>
        <Carousel className="carousel" autoplay>
          <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">7 Fast Food Restaurant</h1>
              <span className="description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, sint placeat. Iusto nihil eaque molestiae unde, iste ipsam illum
                minus, quidem eveniet temporibus porro mollitia laborum. Necessitatibus voluptate libero itaque?
              </span>
              <button className="order-btn">Order now</button>
            </div>
          </div>
          <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">This Month Best Seller</h1>
              <span className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consectetur ab veniam. Architecto impedit eligendi eius sit nam
                necessitatibus placeat eum soluta distinctio tempore laborum neque amet maxime, autem nemo!
              </span>
              <button className="order-btn">Order now</button>
            </div>
          </div>
          <div className="carousel-item-wrapper">
            <div className="carousel-item">
              <h1 className="header">Summer Promotion Event</h1>
              <span className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consectetur ab veniam. Architecto impedit eligendi eius sit nam
                necessitatibus placeat eum soluta distinctio tempore laborum neque amet maxime, autem nemo!
              </span>
              <button className="order-btn">Order now</button>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
