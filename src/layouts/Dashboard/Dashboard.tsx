import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { layoutStyle } from '../../assets/styles/globalStyle';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: FC = () => {
  return (
    <Layout style={layoutStyle}>
      {/* <AppBar /> */}
      <Layout.Header>7FF - HOC MON</Layout.Header>

      <Layout>
        <DashboardSidebar />

        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
