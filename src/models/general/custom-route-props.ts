import { PathRouteProps } from 'react-router-dom';

export interface CustomRouteProps extends PathRouteProps {
  noAuthMiddleware?: boolean;
}