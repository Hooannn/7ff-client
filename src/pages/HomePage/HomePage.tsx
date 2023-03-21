import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';

export default function RootRoute() {
  const { t } = useTranslation();
  useTitle(`${t('home')} - 7FF`);

  return <div>RootRoute</div>;
}
