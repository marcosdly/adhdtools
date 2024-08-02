import { redirect, type RouteObject } from 'react-router-dom';
import Home from '../pages/Home/Home';

export default [
  {
    path: '/*',
    loader: () => redirect('/'),
  },
  {
    path: '/',
    Component: Home,
  },
] as RouteObject[];
