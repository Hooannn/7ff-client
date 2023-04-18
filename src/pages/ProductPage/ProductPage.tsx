import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Button, Image, Rate, Space } from 'antd';
import { HomeOutlined, ReadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useTitle from '../../hooks/useTitle';
import { IProduct } from '../../types';
import { containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/pages/ProductPage.css';
import { addToCart } from '../../slices/app.slice';

const product = {
  _id: '12345678',
  name: 'Chicken burger',
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque doloremque, quis sequi dicta veritatis sapiente ad repellendus suscipit ab ullam.',
  price: 25000,
  yearlyTotalSoldUnits: 6969,
  category: 'burger',
  rating: 4.3,
  viewsCount: 1000,
  featuredImages: ['/food-images/burger-01.png', '/food-images/burger-02.png', '/food-images/burger-03.png'],
  isAvailable: true,
};

const ProductPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(product?.featuredImages[0]);

  useTitle(`${t('product')} - 7FF`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          {/* No product found */}
          {/* Have product */}
          <div className="product-info-wrapper">
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/">
                      <HomeOutlined className="breadcrumb-item" />
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link to="/menu">
                      <span className="breadcrumb-item">{t('menu')}</span>
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link to={`/menu?category=${product.category.toLowerCase()}`}>
                      <span className="breadcrumb-item">{product.category}</span>
                    </Link>
                  ),
                },
                {
                  title: <span className="breadcrumb-item">{product.name}</span>,
                },
              ]}
            />

            <div className="product-info">
              <div className="product-feature-images">
                <div className="active-image">
                  <Image src={activeImage} width={430} height={430} />
                </div>
                <div className="feature-images">
                  {product.featuredImages.map(imageSrc => (
                    <div key={imageSrc} className={`image-wrapper ${activeImage === imageSrc ? 'active' : ''}`}>
                      <img src={imageSrc} onMouseEnter={() => setActiveImage(imageSrc)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-desc">
                <div className="product-name">{product.name}</div>
                <div className="product-sold-units">
                  <span style={{ fontSize: '1rem', fontWeight: 500 }}>{product.yearlyTotalSoldUnits}</span>
                  <span style={{ color: '#767676', textTransform: 'lowercase' }}>{`${
                    product.yearlyTotalSoldUnits > 1 ? t('units are') : t('unit is')
                  } ${t('sold this year')}`}</span>
                </div>
                <Rate disabled defaultValue={Math.ceil(product.rating / 0.5) * 0.5} allowHalf className="product-rating" />
                <p className="product-description">{product.description}</p>
                <div className="product-price">{`₫ ${product.price.toLocaleString('en-US')}`}</div>
                <div className="product-rating"></div>
                <Space align="center" size={15} style={{ marginTop: 30 }}>
                  {product.isAvailable ? (
                    <Button onClick={() => dispatch(addToCart(product._id))} className="product-atc-btn">
                      <ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />
                      {t('add to cart')}
                    </Button>
                  ) : (
                    <Button disabled className="product-atc-btn">
                      {t('this item is currently unavailable')}
                    </Button>
                  )}
                  <Button type="primary" onClick={() => navigate('/menu')} className="product-btm-btn">
                    <ReadOutlined style={{ fontSize: '1.4rem' }} />
                    {t('see the menu')}
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductPage;
