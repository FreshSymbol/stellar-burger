import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIsAuthChecked,
  getUser
} from '../../services/slices/auth/authSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps): ReactElement => {
  const location = useLocation();
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);

  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' replace state={{ from: location }} />;

  if (onlyUnAuth && user)
    return <Navigate to={location.state?.from || '/'} replace />;

  return children;
};
