import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { layoutStyle } from '../../assets/styles/globalStyle';
import AppBar from '../components/AppBar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: FC = () => {
  return (
    <Layout style={layoutStyle}>
      <AppBar isDashboard />

      <Layout>
        <DashboardSidebar />

        <Layout.Content style={{ padding: '16px' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
