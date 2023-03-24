import { FC, useEffect } from 'react';
import Menu from '../../components/Menu';
import '../../assets/styles/pages/MenuPage.css';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';

const MenuPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('menu')} - 7FF`);
  useEffect(() => {
    // setActiveTab('menu')
  }, []);

  return (
    <div className="menu-page">
      <Menu isMenuPage />
    </div>
  );
};

export default MenuPage;
