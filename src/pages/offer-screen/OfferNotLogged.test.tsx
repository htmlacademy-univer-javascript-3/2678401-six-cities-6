import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {OfferNotLogged} from './OfferNotLogged.tsx';

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('OfferNotLogged page', () => {
  it('should render offer not logged page with logo', () => {
    renderWithRouter(<OfferNotLogged/>);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render sign in link', () => {
    renderWithRouter(<OfferNotLogged/>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render offer images', () => {
    renderWithRouter(<OfferNotLogged/>);

    const images = screen.getAllByAltText('Photo studio');
    expect(images.length).toBeGreaterThan(0);
  });
});
