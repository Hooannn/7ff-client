import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { layoutStyle } from '../../assets/styles/globalStyle';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: FC = () => {
  return (
    <Layout style={layoutStyle}>
      {/* <AppBar /> */}
      <Layout.Header>7FF - HOC MON</Layout.Header>

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
