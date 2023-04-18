import { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../assets/styles/globalStyle';
import '../assets/styles/components/Menu.css';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface IProps {
  isMenuPage?: boolean;
}

const Menu: FC<IProps> = ({ isMenuPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const CATEGORIES = ['burger', 'pizza', 'pasta', 'fries'];
  const [categoryQuery, setCategoryQuery] = useSearchParams();

  return (
    <section className="menu">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('our menu')}</h2>
        <ul className="filters-menu">
          <li
            className={`filters-item ${!categoryQuery.get('category') || categoryQuery.get('category') === 'all' ? 'active' : ''}`}
            onClick={() => setCategoryQuery({})}
          >
            {t('all')}
          </li>
          {CATEGORIES.map(value => (
            <li
              className={`filters-item ${categoryQuery.get('category') === value ? 'active' : ''}`}
              key={value}
              onClick={() => setCategoryQuery({ category: value })}
            >
              {/* {t(value)} */}
              {value}
            </li>
          ))}
        </ul>
        <div className="filter-content">
          <div className="menu-card-wrapper">
            <div className="menu-card">
              <div className="image-wrapper">
                <img src="/food-images/burger-01.png" className="image" onClick={() => navigate(`/product/${123}`)} />
              </div>
              <div className="description">
                <h5 className="name" onClick={() => navigate(`/product/${123}`)}>
                  Beef burger
                </h5>
                <p>
                  Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Veritatis voluptate veniam quasi nesciunt voluptas, delectus explicabo recusandae tenetur
                  officiis odit.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 className="price">18$</h6>
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
          <div className="menu-card-wrapper">
            <div className="menu-card">
              <div className="image-wrapper">
                <img src="/food-images/burger-02.png" className="image" onClick={() => navigate(`/product/${123}`)} />
              </div>
              <div className="description">
                <h5 className="name" onClick={() => navigate(`/product/${123}`)}>
                  Chicken burger
                </h5>
                <p>
                  Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Veritatis voluptate veniam quasi nesciunt voluptas, delectus explicabo recusandae tenetur
                  officiis odit.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 className="price">20$</h6>
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
          <div className="menu-card-wrapper">
            <div className="menu-card">
              <div className="image-wrapper">
                <img src="/food-images/burger-03.png" className="image" onClick={() => navigate(`/product/${123}`)} />
              </div>
              <div className="description">
                <h5 className="name" onClick={() => navigate(`/product/${123}`)}>
                  Egg burger
                </h5>
                <p>
                  Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Veritatis voluptate veniam quasi nesciunt voluptas, delectus explicabo recusandae tenetur
                  officiis odit.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 className="price">17$</h6>
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
