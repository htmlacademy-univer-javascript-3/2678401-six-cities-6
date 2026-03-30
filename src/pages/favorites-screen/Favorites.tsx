import {useCallback, useEffect, useMemo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {OfferType} from '../../domain/dto/offer.ts';
import {AppRoute, AuthStatus} from '../../const.ts';
import {getAllOffers, getAuthorizationStatus, getFavoriteOffersCount, getUser} from '../../store/selectors.ts';
import FavoritePlaceCard from '../../components/FavoritePlaceCard.tsx';
import {AppDispatch} from '../../store/indexStore.ts';
import {fetchFavoriteOffersAction, logoutAction, toggleFavoriteAction} from '../../store/action.ts';

export function Favorites(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allOfferList = useSelector(getAllOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  const handleFavoriteClick = useCallback((offerId: string) => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const offer = allOfferList.find((o) => o.id === offerId);
    if (offer) {
      dispatch(toggleFavoriteAction(offerId, !offer.isFavorite));
    }
  }, [dispatch, navigate, authorizationStatus, allOfferList]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const groupedByCity = useMemo(() => {
    const favoriteOffers = allOfferList.filter((offer) => offer.isFavorite);
    return favoriteOffers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {} as Record<string, OfferType[]>);
  }, [allOfferList]);

  const hasFavorites = Object.keys(groupedByCity).length > 0;

  return (
    <div className={`page ${!hasFavorites ? 'page--favorites-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img className="header__avatar user__avatar" src={user.avatarUrl} alt={user.name} width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--favorites ${!hasFavorites ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {hasFavorites ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <FavoritePlaceCard key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
