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
  AreaChartOutlined,
  TagsOutlined,
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
    <Layout.Sider
      theme="dark"
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      style={{ boxShadow: '1px 0px 1px rgba(0, 0, 0, 0.12)' }}
    >
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={e => navigate(`/dashboard${e.key}`)}
        items={[
          {
            label: t('dashboard'),
            key: '',
            icon: <HomeOutlined />,
          },
          {
            label: t('client facing'),
            key: '/client_facing',
            icon: <UserOutlined />,
            children: [
              {
                label: t('products'),
                key: '/products',
                icon: <ShoppingCartOutlined />,
              },
              {
                label: t('users'),
                key: '/users',
                icon: <UserOutlined />,
              },
              {
                label: t('orders'),
                key: '/orders',
                icon: <FileTextOutlined />,
              },
              {
                label: t('vouchers'),
                key: '/vouchers',
                icon: <TagsOutlined />,
              },
            ],
          },
          {
            label: t('sales'),
            key: '/sales',
            icon: <AreaChartOutlined />,
            children: [
              {
                label: t('overall'),
                key: '/overall',
                icon: <LineChartOutlined />,
              },
              {
                label: t('monthly data'),
                key: '/monthly-data',
                icon: <BarChartOutlined />,
              },
              {
                label: t('breakdown'),
                key: '/breakdown',
                icon: <PieChartOutlined />,
              },
            ],
          },
        ]}
      />
    </Layout.Sider>
  );
};

export default DashboardSidebar;
