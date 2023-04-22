import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getI18n, useTranslation } from 'react-i18next';
import { Breadcrumb, Button, Card, Image, Rate, Skeleton, Space } from 'antd';
import { HomeOutlined, ReadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useTitle from '../../hooks/useTitle';
import useAxiosIns from '../../hooks/useAxiosIns';
import { IProduct, IResponseData } from '../../types';
import { containerStyle } from '../../assets/styles/globalStyle';
import useCartItems from '../../services/cart';
import '../../assets/styles/pages/ProductPage.css';

const ProductPage: FC = () => {
  const { t } = useTranslation();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';
  const { addCartItemMutation } = useCartItems({ enabledFetchCartItems: false });
  const navigate = useNavigate();
  const { productId } = useParams();
  const axios = useAxiosIns();
  const getProductQuery = useQuery(['product', productId], {
    queryFn: () => axios.get<IResponseData<IProduct>>(`/products/${productId}`),
    enabled: true,
    select: res => res.data,
    onSuccess: data => {
      setActiveImage((data.data as any)?.featuredImages[0]);
    },
  });
  const product = getProductQuery.data?.data as IProduct;
  const [activeImage, setActiveImage] = useState(product?.featuredImages?.length ? product?.featuredImages[0] : '');

  useTitle(`${t('product')} - 7FF`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          <div className="product-info-wrapper">
            {getProductQuery.isLoading && (
              <Card style={{ width: '100%', marginTop: 16, height: '700px' }}>
                <Skeleton loading avatar active></Skeleton>
              </Card>
            )}

            {!getProductQuery.isLoading && product && (
              <>
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
                        <Link to={`/menu?category=${(product?.category as any)?.name[locale]}`}>
                          <span className="breadcrumb-item">{(product?.category as any)?.name[locale]}</span>
                        </Link>
                      ),
                    },
                    {
                      title: <span className="breadcrumb-item">{product?.name[locale]}</span>,
                    },
                  ]}
                />
                <div className="product-info">
                  <div className="product-feature-images">
                    <div className="active-image">{activeImage && <Image src={activeImage} width={430} height={430} />}</div>
                    <div className="feature-images">
                      {product?.featuredImages?.map(imageSrc => (
                        <div key={imageSrc} className={`image-wrapper ${activeImage === imageSrc ? 'active' : ''}`}>
                          <img src={imageSrc} onMouseEnter={() => setActiveImage(imageSrc)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="product-desc">
                    <div className="product-name">{product?.name[locale]}</div>
                    <div className="product-sold-units">
                      <span style={{ fontSize: '1rem', fontWeight: 500 }}>{product?.yearlyTotalSoldUnits || 0}</span>
                      <span style={{ color: '#767676', textTransform: 'lowercase' }}>{`${
                        product?.yearlyTotalSoldUnits && product.yearlyTotalSoldUnits > 1 ? t('units are') : t('unit is')
                      } ${t('sold this year')}`}</span>
                    </div>
                    <Rate disabled defaultValue={Math.ceil((product?.rating as any) / 0.5) * 0.5} allowHalf className="product-rating" />
                    <p className="product-description">{product?.description[locale]}</p>
                    <div className="product-price">{`₫ ${product?.price.toLocaleString('en-US')}`}</div>
                    <div className="product-rating"></div>
                    <Space align="center" size={15} style={{ marginTop: 30 }}>
                      {product?.isAvailable ? (
                        <Button
                          onClick={() => addCartItemMutation.mutate({ productId: product._id as string, quantity: 1 })}
                          className="product-atc-btn"
                        >
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
              </>
            )}

            {!getProductQuery.isLoading && !product && (
              <div className="product-not-found">
                <span className="oops-title">Oops!</span>
                <p>{locale === 'en' ? 'This product does not exist or has been deleted.' : 'Sản phẩm không tồn tại hoặc đã bị xóa.'}</p>
                <Space align="center" size={15} style={{ marginTop: 30 }}>
                  <Button onClick={() => navigate('/')} className="product-bth-btn">
                    <HomeOutlined style={{ fontSize: '1.4rem' }} />
                    {t('back to home')}
                  </Button>
                  <Button type="primary" onClick={() => navigate('/menu')} className="product-btm-btn">
                    <ReadOutlined style={{ fontSize: '1.4rem' }} />
                    {t('see the menu')}
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductPage;
