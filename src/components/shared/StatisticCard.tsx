import { Card, Row, Col, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { PropsWithChildren, useMemo } from 'react';

interface StatisticCardProps extends PropsWithChildren {
  value: number;
  previousValue: number;
  label?: string;
  unit?: string;
}

export default function StatisticCard(props: StatisticCardProps) {
  const percentGrowth = useMemo(
    () => (((props.value - props.previousValue) / props.previousValue) * 100).toFixed(2),
    [props.previousValue, props.value],
  );
  const isIncreasing = useMemo(() => parseFloat(percentGrowth) > 0, [percentGrowth]);
  return (
    <Card
      style={{
        borderRadius: '12px',
        boxShadow: '0px 0px 16px rgba(17,17,26,0.1)',
      }}
    >
      <Row align="middle" gutter={12}>
        <Col>
          {isIncreasing ? (
            <ArrowUpOutlined style={{ background: '#e8efe5', padding: '10px', borderRadius: '8px', color: '#59a959' }} />
          ) : (
            <ArrowDownOutlined style={{ background: '#f9cece', padding: '10px', borderRadius: '8px', color: '#c52525' }} />
          )}
        </Col>
        <Col>
          <Row align="middle">
            <div style={{ fontSize: '32px' }}>
              <strong>{props.unit}</strong>
            </div>
            <div style={{ fontSize: '32px' }}>
              <strong>{props.value}</strong>
            </div>
            <span style={{ marginLeft: '8px', color: isIncreasing ? '#59a959' : '#c52525' }}>
              <strong>
                {isIncreasing ? '+' : ''}
                {percentGrowth}%
              </strong>
            </span>
          </Row>
          <div style={{ fontSize: '18px', color: 'grey' }}>{props.label}</div>
        </Col>
      </Row>
    </Card>
  );
}
