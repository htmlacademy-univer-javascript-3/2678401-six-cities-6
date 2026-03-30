import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute, AuthStatus} from './const.ts';
import {getAuthorizationStatus} from './store/selectors.tsx';

type PrivateRouteProps = {
  children: JSX.Element;
}

/**
 * Некая проверка на авторизацию, иначе переводим на страницу для авторизации
 */
export function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
