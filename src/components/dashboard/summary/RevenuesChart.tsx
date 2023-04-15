import { Card } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
interface RevenuesChartProps {
  data:
    | {
        name: string;
        value: number;
      }[]
    | undefined;
}
export default function RevenuesChart({ data }: RevenuesChartProps) {
  return (
    <Card
      title="Revenues"
      style={{
        borderRadius: '12px',
        boxShadow: '0px 0px 16px rgba(17,17,26,0.1)',
      }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart barSize={10} data={data} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8dbd75" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
