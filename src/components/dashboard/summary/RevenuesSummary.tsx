import StatisticCard, { StatisticCardProps } from '../../shared/StatisticCard';

export default function RevenuesSummary({ value, previousValue }: Partial<StatisticCardProps>) {
  return <StatisticCard unit="$" value={value as number} previousValue={previousValue as number} label="Revenues" />;
}
