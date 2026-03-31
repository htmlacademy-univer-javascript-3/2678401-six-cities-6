import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import PlaceCard from './PlaceCard.tsx';
import {OfferType} from '../domain/dto/offer.ts';

const mockOffer: OfferType = {
  id: '1',
  title: 'Beautiful Apartment',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.856613,
    longitude: 2.352222,
    zoom: 10,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test-image.jpg',
};

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('PlaceCard component', () => {
  it('should render card with offer data', () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={mockOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockOffer.previewImage);
  });

  it('should display Premium mark when offer.isPremium is true', () => {
    const premiumOffer: OfferType = {...mockOffer, isPremium: true};
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={premiumOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not display Premium mark when offer.isPremium is false', () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={mockOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should display active favorite button when offer.isFavorite is true', () => {
    const favoriteOffer: OfferType = {...mockOffer, isFavorite: true};
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={favoriteOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should call onMouseEnter when mouse enters card', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={mockOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const card = screen.getByRole('article');
    await user.hover(card);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when mouse leaves card', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={mockOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const card = screen.getByRole('article');
    await user.hover(card);
    await user.unhover(card);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should have link to offer page', () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    renderWithRouter(
      <PlaceCard
        offer={mockOffer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href') === `/offer/${mockOffer.id}`);
    expect(offerLink).toBeInTheDocument();
  });

  it('should work without optional callbacks', () => {
    renderWithRouter(<PlaceCard offer={mockOffer}/>);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
