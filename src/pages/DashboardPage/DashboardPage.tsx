import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';

const DashboardPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('dashboard')} - 7FF`);

  return <div>Dashboard</div>;
};

export default DashboardPage;
