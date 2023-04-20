import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Col, Row, Skeleton, Tooltip } from 'antd';
import { getI18n, useTranslation } from 'react-i18next';
import { containerStyle } from '../assets/styles/globalStyle';
import '../assets/styles/components/Menu.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import useAxiosIns from '../hooks/useAxiosIns';
import { IResponseData, ICategory, IProduct } from '../types';

interface IProps {
  isMenuPage?: boolean;
}

const Menu: FC<IProps> = ({ isMenuPage }) => {
  const { t } = useTranslation();
  const [searchProductQuery, setSearchProductQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>();
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const axios = useAxiosIns();
  const locale = getI18n().resolvedLanguage as 'vi' | 'en';
  const fetchCategoriesQuery = useQuery(['categories'], {
    queryFn: () => axios.get<IResponseData<ICategory[]>>(`/categories`),
    enabled: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
    select: res => res.data,
  });
  const fetchProductsQuery = useQuery(['products', skip, limit, searchProductQuery], {
    queryFn: () => axios.get<IResponseData<IProduct[]>>(`/products?filter=${searchProductQuery}&skip=${skip}&limit=${limit}`),
    enabled: true,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
    select: res => res.data,
  });
  const navigate = useNavigate();
  const categories = fetchCategoriesQuery.data?.data;
  const products = fetchProductsQuery.data?.data;
  const [categoryQuery, setCategoryQuery] = useSearchParams();

  useEffect(() => {
    if (isMenuPage) {
      setLimit(20);
    }
    return () => {};
  }, [isMenuPage]);

  useEffect(() => {
    if (activeCategory) setSearchProductQuery(JSON.stringify({ category: activeCategory }));
    else setSearchProductQuery('');
  }, [activeCategory]);

  return (
    <section className="menu">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('our menu')}</h2>
        <ul className="filters-menu">
          {fetchCategoriesQuery.isLoading && <Skeleton.Button active size="large" shape="round" block />}
          <li
            className={`filters-item ${!categoryQuery.get('category') || categoryQuery.get('category') === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory('');
              setCategoryQuery({});
            }}
          >
            {t('all')}
          </li>
          {categories?.map(value => (
            <li
              className={`filters-item ${categoryQuery.get('category') === value.name[locale] ? 'active' : ''}`}
              key={value._id}
              onClick={() => {
                setActiveCategory(value._id);
                setCategoryQuery({ category: value.name[locale] });
              }}
            >
              {value.name[locale]}
            </li>
          ))}
        </ul>
        <div className="filter-content">
          {fetchProductsQuery.isLoading && (
            <Row style={{ width: '100%' }} gutter={12}>
              {Array(limit)
                .fill(0)
                .map((_, idx) => (
                  <Col key={idx} span={8}>
                    <Card loading style={{ height: '350px', width: '100%' }} />
                  </Col>
                ))}
            </Row>
          )}
          {products?.map(product => (
            <div key={product._id} className="menu-card-wrapper">
              <div className="menu-card">
                <div className="image-wrapper">
                  <img src={(product as any).featuredImages[0]} className="image" onClick={() => navigate(`/product/${product._id}`)} />
                </div>
                <div className="description">
                  <h5 className="name" onClick={() => navigate(`/product/${product._id}`)}>
                    {product.name[locale]}
                  </h5>
                  <p>{product.description[locale]}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h6 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</h6>
                    <Tooltip title={t('add to cart')} placement="bottom">
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<ShoppingCartOutlined style={{ marginLeft: -1, marginTop: 3, fontSize: '1.3rem' }} />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isMenuPage && (
          <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" shape="round" size="large" className="view-more-btn" onClick={() => navigate('/menu')}>
              {t('view more')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
