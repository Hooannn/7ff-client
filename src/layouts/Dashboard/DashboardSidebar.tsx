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
import { useTranslation } from 'react-i18next';

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
                label: t('user'),
                key: 'users',
                icon: <UsergroupAddOutlined />,
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
