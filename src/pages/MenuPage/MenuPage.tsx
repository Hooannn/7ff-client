import { FC, useEffect } from 'react';
import Menu from '../../components/Menu';
import '../../assets/styles/pages/MenuPage.css';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../slices/app.slice';

const MenuPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useTitle(`${t('menu')} - 7FF`);
  useEffect(() => {
    dispatch(setActiveTab('menu'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="menu-page">
      <Menu isMenuPage />
    </div>
  );
};

export default MenuPage;
