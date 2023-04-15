import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import { Row, Col, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { buttonStyle } from '../../assets/styles/globalStyle';
import UsersSummary from '../../components/dashboard/summary/UsersSummary';
import OrdersSummary from '../../components/dashboard/summary/OrdersSummary';
import RevenuesSummary from '../../components/dashboard/summary/RevenuesSummary';
const DashboardPage: FC = () => {
  const { t } = useTranslation();
  useTitle(`${t('dashboard')} - 7FF`);

  const segmentedOptions = [
    {
      label: t('weekly'),
      value: 'weekly',
    },
    {
      label: t('monthly'),
      value: 'monthly',
    },
    {
      label: t('yearly'),
      value: 'yearly',
    },
  ];
  const [selectedSegment, setSelectedSegment] = useState<string>(segmentedOptions[0].value);
  const onExportToCSV = () => {};

  return (
    <Row>
      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>{t('summary')}</h2>
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
          <Col md={6}>
            <UsersSummary />
          </Col>
          <Col md={6}>
            <OrdersSummary />
          </Col>
          <Col md={6}>
            <UsersSummary />
          </Col>
          <Col md={6}>
            <UsersSummary />
          </Col>
        </Row>
      </Col>

      <Col span={24} style={{ padding: '24px 0' }}>
        <RevenuesSummary />
      </Col>
    </Row>
  );
};

export default DashboardPage;
