import { redirect, type RouteObject } from 'react-router-dom';
import Hypnosis from '../pages/Hypnosis/Hypnosis';

export default [
  {
    path: '/hypnosis/*',
    loader: () => redirect('/hypnosis'),
  },
  {
    path: '/hypnosis',
    Component: Hypnosis,
  },
] as RouteObject[];
