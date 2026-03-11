import React from 'react';
import { useRoutes } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';
// import Home from '../pages/Home';
// import Corporates from '../pages/Corporates';
// import Features from '../pages/Features';
import NotFound from '../pages/NotFound';
import Landing from '../pages/landing/index';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    // {
    //   element: <MainLayout />,
    //   children: [
    //     { path: '/', element: <Home /> },
    //     { path: '/corporates', element: <Corporates /> },
    //     { path: '/features', element: <Features /> },
    //   ],
    // },
    // Landing page without MainLayout (no header/footer)
    { path: '/', element: <Landing /> },
    // 404 page - catch all unmatched routes
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
};

export default AppRoutes;
