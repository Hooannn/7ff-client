import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const DASHBOARD_MENU_ITEMS = [
  {
    label: 'Dashboard',
    key: '',
    icon: <HomeOutlined />,
  },
  {
    label: 'ClientFacing',
    key: 'client_facing',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Products',
        key: 'products',
        icon: <ShoppingCartOutlined />,
      },
      {
        label: 'Customers',
        key: 'customers',
        icon: <UserOutlined />,
      },
      {
        label: 'Orders',
        key: 'orders',
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    label: 'Sales',
    key: 'sales',
    icon: <AreaChartOutlined />,
    children: [
      {
        label: 'Overall',
        key: 'overall',
        icon: <LineChartOutlined />,
      },
      {
        label: 'MonthlyData',
        key: 'monthly-data',
        icon: <BarChartOutlined />,
      },
      {
        label: 'Breakdown',
        key: 'breakdown',
        icon: <PieChartOutlined />,
      },
    ],
  },
  {
    label: 'Management',
    key: 'management',
    icon: <SafetyCertificateOutlined />,
    children: [
      {
        label: 'Admin',
        key: 'admin',
        icon: <SafetyCertificateOutlined />,
      },
      {
        label: 'Performance',
        key: 'performance',
        icon: <RiseOutlined />,
      },
    ],
  },
];

const DashboardSidebar: FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Layout.Sider theme="light" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={e => navigate(`/dashboard/${e.key}`)}
        items={DASHBOARD_MENU_ITEMS}
      />
    </Layout.Sider>
  );
};

export default DashboardSidebar;
