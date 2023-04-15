import StatisticCard from '../../shared/StatisticCard';

export default function OrdersSummary() {
  return <StatisticCard unit="$" value={100} previousValue={120} label="Total orders" />;
}
