import { useTranslation } from 'react-i18next';
import RevenuesChart from '../../components/dashboard/summary/RevenuesChart';
import { Row, Col, Select } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import useAxiosIns from '../../hooks/useAxiosIns';
import { IProduct, IResponseData } from '../../types';
import ProductCard from '../../components/dashboard/summary/ProductCard';
export default function OverallDashboardPage() {
  const { t } = useTranslation();
  const axios = useAxiosIns();
  const [type, setType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const getRevenuesChartQuery = useQuery({
    queryKey: ['revenues-chart', type],
    queryFn: () => axios.get<IResponseData<any>>(`/statistics/charts/revenues?type=${type}`),
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
    select: res => res.data?.data,
  });

  const getProductsQuery = useQuery({
    queryKey: 'products',
    queryFn: () => axios.get<IResponseData<IProduct[]>>(`/products`),
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
    select: res => res.data?.data,
  });

  const products = getProductsQuery.data;
  return (
    <Row>
      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>{t('overall')}</h2>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Col>

      <Col span={24}>
        <RevenuesChart
          loading={getRevenuesChartQuery.isLoading}
          data={getRevenuesChartQuery.data}
          extra={
            <Select value={type} size="large" style={{ width: 200 }} dropdownStyle={{ padding: 5 }} onChange={value => setType(value)}>
              <Select.Option value="daily" className="sort-option-item">
                {t('daily')}
              </Select.Option>
              <Select.Option value="weekly" className="sort-option-item">
                {t('weekly')}
              </Select.Option>
              <Select.Option value="monthly" className="sort-option-item">
                {t('monthly')}
              </Select.Option>
              <Select.Option value="yearly" className="sort-option-item">
                {t('yearly')}
              </Select.Option>
            </Select>
          }
        />
      </Col>
      <Col span={24} style={{ padding: '24px 0' }}>
        <h2>{t('products overall')}</h2>
        <Row gutter={12}>
          {products?.map(product => (
            <Col lg={12} xl={6} key={product._id} style={{ paddingBottom: '24px' }}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
