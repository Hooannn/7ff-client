import { Card } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const data = [
  {
    name: 'Page A',
    value: 1111,
  },
  {
    name: 'Page B',
    value: 33333,
  },
  {
    name: 'Page C',
    value: 444,
  },
  {
    name: 'Page D',
    value: 40200,
  },
  {
    name: 'Page E',
    value: 2222,
  },
  {
    name: 'Page F',
    value: 1111,
  },
  {
    name: 'Page G',
    value: 222,
  },
];
export default function RevenuesSummary() {
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
