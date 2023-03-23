import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../../assets/styles/globalStyle';

const SaleOff: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="sale-off">
      <div className="container" style={containerStyle}>
        <div className="daily-promotions">
          <div className="promotion-card">
            <div className="image">
              <Image src="/food-images/promotion-burger.jpg" />
            </div>
            <div className="description">
              <h5 className="title">Tasty Thursdays</h5>
              <h6 className="sale-off-tag">
                <span>20%</span> Off
              </h6>
              <Button type="primary" shape="round" size="large" className="order-btn">
                {t('order now')} <ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />
              </Button>
            </div>
          </div>
          <div className="promotion-card">
            <div className="image">
              <Image src="/food-images/promotion-pizza.jpg" />
            </div>
            <div className="description">
              <h5 className="title">Pizza Days</h5>
              <h6 className="sale-off-tag">
                <span>20.000</span> Off
              </h6>
              <Button type="primary" shape="round" size="large" className="order-btn">
                {t('order now')} <ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleOff;
