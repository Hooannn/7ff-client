import StatisticCard, { StatisticCardProps } from '../../shared/StatisticCard';

export default function OrdersSummary({ value, previousValue }: Partial<StatisticCardProps>) {
  return <StatisticCard value={value as number} previousValue={previousValue as number} label="Total orders" />;
}
