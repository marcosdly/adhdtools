import type { RouteObject } from 'react-router-dom';
import hypnosis from './hypnosis';
import home from './home';

export default [...home, ...hypnosis] as RouteObject[];
