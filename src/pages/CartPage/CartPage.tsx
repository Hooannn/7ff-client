import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { containerStyle } from '../../assets/styles/globalStyle';
import useTitle from '../../hooks/useTitle';
import '../../assets/styles/pages/CartPage.css';
import { setActiveTab } from '../../slices/app.slice';
import { useDispatch } from 'react-redux';

const CartPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useTitle(`${t('cart')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab(null));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart-page">
      <section className="container-wrapper">
        <div className="container" style={containerStyle}>
          <div className="heading-and-progress">
            <h2 className="heading">{t('my cart')}</h2>
            <span>progress</span>
          </div>
          <div className="cart-items-wrapper">
            <div className="cart-items">items</div>
            <div className="order-summary">summary</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
