import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/auth/authSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(getUser)?.name} />
);
