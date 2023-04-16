import { Card } from 'antd';
import { IProduct } from '../../../types';

interface PopularProductsProps {
  data: IProduct[];
}
export default function PopularProducts({ data }: PopularProductsProps) {
  return <Card title={t('popular products')}></Card>;
}
