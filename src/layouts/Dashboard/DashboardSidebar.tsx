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
  UsergroupAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
<<<<<<< HEAD

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
        label: 'Users',
        key: 'admin/users',
        icon: <UsergroupAddOutlined />,
      },
      {
        label: 'Performance',
        key: 'performance',
        icon: <RiseOutlined />,
      },
    ],
  },
];
=======
import { useTranslation } from 'react-i18next';
>>>>>>> c56e31f9b90af60d3b2242146237af46255576e3

const DashboardSidebar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Layout.Sider theme="light" width={250} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={e => navigate(`/dashboard/${e.key}`)}
        items={[
          {
            label: t('dashboard'),
            key: '',
            icon: <HomeOutlined />,
          },
          {
            label: t('client facing'),
            key: 'client_facing',
            icon: <UserOutlined />,
            children: [
              {
                label: t('products'),
                key: 'products',
                icon: <ShoppingCartOutlined />,
              },
              {
                label: t('customers'),
                key: 'customers',
                icon: <UserOutlined />,
              },
              {
                label: t('orders'),
                key: 'orders',
                icon: <FileTextOutlined />,
              },
            ],
          },
          {
            label: t('sales'),
            key: 'sales',
            icon: <AreaChartOutlined />,
            children: [
              {
                label: t('overall'),
                key: 'overall',
                icon: <LineChartOutlined />,
              },
              {
                label: t('monthly data'),
                key: 'monthly-data',
                icon: <BarChartOutlined />,
              },
              {
                label: t('breakdown'),
                key: 'breakdown',
                icon: <PieChartOutlined />,
              },
            ],
          },
          {
            label: t('management'),
            key: 'management',
            icon: <SafetyCertificateOutlined />,
            children: [
              {
                label: t('admin'),
                key: 'admin',
                icon: <SafetyCertificateOutlined />,
              },
              {
                label: t('performance'),
                key: 'performance',
                icon: <RiseOutlined />,
              },
            ],
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default DashboardSidebar;
