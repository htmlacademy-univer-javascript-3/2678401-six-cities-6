import {useState, useMemo, useCallback, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PlaceCardList from '../../components/PlaceCardList.tsx';
import {AppRoute, AuthStatus, CITY_LIST, SortType} from '../../const.ts';
import Map from '../../components/Map.tsx';
import {City, Point, Points} from '../../types.tsx';
import CityList from '../../components/CityList.tsx';
import {changeCity, fetchOffersAction, logoutAction, toggleFavoriteAction} from '../../store/action.ts';
import {AppDispatch} from '../../store/indexStore.ts';
import Spinner from '../../components/Spinner.tsx';
import ExceptionMessage from '../../components/ExceptionMessage.tsx';
import {OfferType} from '../../domain/dto/offer.ts';
import EmptyMainContent from '../../components/EmptyMainContent.tsx';
import {
  getAuthorizationStatus, getFavoriteOffersCount,
  getFilteredOffers,
  getOffersError,
  getOffersLoadingStatus,
  getSelectedCity, getUser
} from '../../store/selectors.ts';

export function Main(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectedCity = useSelector(getSelectedCity);
  const filteredOfferList = useSelector(getFilteredOffers);
  const isOffersDataLoading = useSelector(getOffersLoadingStatus);
  const offersDataError = useSelector(getOffersError);
  const authStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  const [sortType, setSortType] = useState<SortType>('Popular');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);

  const sortedOfferList = useMemo(() => {
    const offerList = [...filteredOfferList];
    switch (sortType) {
      case 'Price: low to high':
        return offerList.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return offerList.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return offerList.sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return offerList;
    }
  }, [filteredOfferList, sortType]);

  const cityCoordinates: City = useMemo(() => sortedOfferList[0]
    ? {
      lat: sortedOfferList[0].city.location.latitude,
      lng: sortedOfferList[0].city.location.longitude,
      zoom: sortedOfferList[0].city.location.zoom,
    }
    : {
      lat: 52.38333,
      lng: 4.9,
      zoom: 10,
    }, [sortedOfferList]);

  const points: Points = useMemo(() => sortedOfferList.map((offer: OfferType) => ({
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    title: offer.title,
    id: offer.id,
  })), [sortedOfferList]);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleFavoriteClick = useCallback((offerId: string) => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const offer = sortedOfferList.find((o) => o.id === offerId);
    if (offer) {
      dispatch(toggleFavoriteAction(offerId, !offer.isFavorite));
    }
  }, [dispatch, navigate, authStatus, sortedOfferList]);

  const handleSortTypeChange = useCallback((newSortType: SortType) => {
    setSortType(newSortType);
    setIsSortMenuOpen(false);
  }, []);

  const handleSortMenuToggle = useCallback(() => {
    setIsSortMenuOpen((prev) => !prev);
  }, []);

  const handleSortMenuClose = useCallback(() => {
    setIsSortMenuOpen(false);
  }, []);

  const handleCardMouseEnter = useCallback((offerId: string) => {
    const offer = sortedOfferList.find((o) => o.id === offerId);
    if (offer) {
      setSelectedCardId(offerId);
      setSelectedPoint({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
        title: offer.title,
        id: offer.id,
      });
    }
  }, [sortedOfferList]);

  const handleCardMouseLeave = useCallback(() => {
    setSelectedPoint(undefined);
    setSelectedCardId(undefined);
  }, []);

  const handleMarkerMouseEnter = useCallback((point: Point) => {
    if (point.id) {
      setSelectedCardId(point.id);
      setSelectedPoint(point);
    }
  }, []);

  const handleMarkerMouseLeave = useCallback(() => {
    setSelectedCardId(undefined);
    setSelectedPoint(undefined);
  }, []);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authStatus === AuthStatus.Auth && user ? (
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
                        e.preventDefault(); handleLogout();
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList
          cities={CITY_LIST}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
        <div className="cities">
          <div className={`cities__places-container ${!offersDataError && !isOffersDataLoading && sortedOfferList.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {!offersDataError && !isOffersDataLoading && sortedOfferList.length === 0 ? (
              <EmptyMainContent city={selectedCity} />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                {offersDataError && (
                  <ExceptionMessage message={offersDataError} />
                )}
                {!offersDataError && isOffersDataLoading && (
                  <Spinner />
                )}
                {!offersDataError && !isOffersDataLoading && (
                  <>
                    <b className="places__found">
                      {sortedOfferList.length} places to stay in {selectedCity}
                    </b>
                    <form className="places__sorting" action="#" method="get">
                      <span className="places__sorting-caption">Sort by</span>
                      <span
                        className="places__sorting-type"
                        tabIndex={0}
                        onClick={handleSortMenuToggle}
                        onBlur={handleSortMenuClose}
                      >
                        {sortType}
                        <svg className="places__sorting-arrow" width="7" height="4">
                          <use href="#icon-arrow-select"></use>
                        </svg>
                      </span>
                      <ul className={`places__options places__options--custom ${isSortMenuOpen ? 'places__options--opened' : ''}`}>
                        <li
                          className={`places__option ${sortType === 'Popular' ? 'places__option--active' : ''}`}
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSortTypeChange('Popular');
                          }}
                        >
                          Popular
                        </li>
                        <li
                          className={`places__option ${sortType === 'Price: low to high' ? 'places__option--active' : ''}`}
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSortTypeChange('Price: low to high');
                          }}
                        >
                          Price: low to high
                        </li>
                        <li
                          className={`places__option ${sortType === 'Price: high to low' ? 'places__option--active' : ''}`}
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSortTypeChange('Price: high to low');
                          }}
                        >
                          Price: high to low
                        </li>
                        <li
                          className={`places__option ${sortType === 'Top rated first' ? 'places__option--active' : ''}`}
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSortTypeChange('Top rated first');
                          }}
                        >
                          Top rated first
                        </li>
                      </ul>
                    </form>
                    <PlaceCardList
                      offers={sortedOfferList}
                      onFavoriteClick={handleFavoriteClick}
                      onCardMouseEnter={handleCardMouseEnter}
                      onCardMouseLeave={handleCardMouseLeave}
                      selectedCardId={selectedCardId}
                    />
                  </>
                )}
              </section>
            )}
            {(!offersDataError && !isOffersDataLoading && sortedOfferList.length > 0) && (
              <div className="cities__right-section">
                <Map
                  city={cityCoordinates}
                  points={points}
                  selectedPoint={selectedPoint}
                  onMarkerMouseEnter={handleMarkerMouseEnter}
                  onMarkerMouseLeave={handleMarkerMouseLeave}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
