import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {FavoritesEmpty} from './FavoritesEmpty.tsx';

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('FavEmpty page', () => {
  it('should render empty favorites page', () => {
    renderWithRouter(<FavoritesEmpty/>);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render header with logo', () => {
    renderWithRouter(<FavoritesEmpty/>);

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });
});
