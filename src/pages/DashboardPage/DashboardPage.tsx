import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import { Row, Col, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { buttonStyle } from '../../assets/styles/globalStyle';
import useStatistics from '../../services/statistics';
import UsersSummary from '../../components/dashboard/summary/UsersSummary';
import RevenuesSummary from '../../components/dashboard/summary/RevenuesSummary';
import OrdersSummary from '../../components/dashboard/summary/OrdersSummary';
import RevenuesChart from '../../components/dashboard/summary/RevenuesChart';
import dayjs from '../../libs/dayjs';
const DashboardPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('dashboard')} - 7FF`);
  const { getStatisticsQuery, setFrom, setTo } = useStatistics();
  const orders = getStatisticsQuery.data?.orders;
  const revenues = getStatisticsQuery.data?.revenues;
  const users = getStatisticsQuery.data?.users;

  const segmentedOptions = [
    {
      label: t('daily'),
      value: 'daily',
      from: dayjs().startOf('day').valueOf(),
      to: dayjs().valueOf(),
    },
    {
      label: t('weekly'),
      value: 'weekly',
      from: dayjs().startOf('week').valueOf(),
      to: dayjs().valueOf(),
    },
    {
      label: t('monthly'),
      value: 'monthly',
      from: dayjs().startOf('month').valueOf(),
      to: dayjs().valueOf(),
    },
    {
      label: t('yearly'),
      value: 'yearly',
      from: dayjs().startOf('year').valueOf(),
      to: dayjs().valueOf(),
    },
  ];
  const [selectedSegment, setSelectedSegment] = useState<string>(segmentedOptions[0].value);

  useEffect(() => {
    const segmentOption = segmentedOptions.find(option => option.value === selectedSegment);
    setFrom(segmentOption?.from as number);
    setTo(segmentOption?.to as number);
  }, [selectedSegment]);

  const onExportToCSV = () => {};

  return (
    <Row>
      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>Dashboard</h2>
          </Col>
          <Col span={12}>
            <Row align="middle" justify="end" gutter={8}>
              <Col>
                <Row>
                  {segmentedOptions.map(option => (
                    <Col key={option.label?.toString()}>
                      <Button
                        style={{ padding: '8px 0px', height: 'unset', minWidth: '90px' }}
                        onClick={() => setSelectedSegment(option.value)}
                        type={selectedSegment === option.value ? 'primary' : 'text'}
                      >
                        {option.label}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={5}>
                <Button
                  block
                  icon={<DownloadOutlined style={{ marginRight: '4px' }} />}
                  type="text"
                  shape="round"
                  style={buttonStyle}
                  onClick={() => onExportToCSV()}
                >
                  <strong>{t('create report')}</strong>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row align="middle" justify="space-between" gutter={12}>
          <Col md={8}>
            <RevenuesSummary loading={getStatisticsQuery.isLoading} value={revenues?.currentCount} previousValue={revenues?.previousCount} />
          </Col>
          <Col md={8}>
            <OrdersSummary loading={getStatisticsQuery.isLoading} value={orders?.currentCount} previousValue={orders?.previousCount} />
          </Col>
          <Col md={8}>
            <UsersSummary loading={getStatisticsQuery.isLoading} value={users?.currentCount} previousValue={users?.previousCount} />
          </Col>
        </Row>
      </Col>

      <Col span={24} style={{ padding: '24px 0' }}>
        <RevenuesChart loading={getStatisticsQuery.isLoading} data={revenues?.details} />
      </Col>
    </Row>
  );
};

export default DashboardPage;
