import { Card } from 'antd';
import { IProduct } from '../../../types';
import { useTranslation } from 'react-i18next';

interface PopularProductsProps {
  data: IProduct[];
}
export default function PopularProducts({ data }: PopularProductsProps) {
  const { t } = useTranslation();
  return <Card title={t('popular products')}></Card>;
}
