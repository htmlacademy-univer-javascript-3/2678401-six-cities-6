import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Main} from '../pages/main-screen/Main.tsx';
import {AppRoute} from '../const.ts';
import {Login} from '../pages/Login.tsx';
import {PrivateRoute} from '../PrivateRoute.tsx';
import {Favorites} from '../pages/favorites-screen/Favorites.tsx';
import {ErrorNotFound} from '../pages/ErrorNotFound.tsx';
import Offer from '../pages/offer-screen/Offer.tsx';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main/>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer/>}
        />
        <Route
          path="*"
          element={<ErrorNotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
