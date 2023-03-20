import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { layoutStyle } from '../../assets/styles/globalStyle';
import AppBar from '../components/AppBar';

const MainLayout: FC = () => {
  return (
    <Layout style={layoutStyle}>
      <AppBar />

      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;
