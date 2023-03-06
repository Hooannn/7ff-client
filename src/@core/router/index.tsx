import rootRouter from './RootRouter';
import authRouter from './AuthRouter';
import devRouter from './DevRouter';
import dashboardRouter from './DashboardRouter';
import { createBrowserRouter } from 'react-router-dom';

const production = createBrowserRouter([...rootRouter, ...authRouter, ...dashboardRouter]);
const dev = createBrowserRouter([...rootRouter, ...authRouter, ...devRouter, ...dashboardRouter]);
const getRouter = (isDev: boolean) => (isDev ? dev : production);

export default getRouter;
