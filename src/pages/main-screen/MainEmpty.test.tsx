import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {MainEmpty} from './MainEmpty.tsx';

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('MainEmpty page', () => {
  it('should render empty main page', () => {
    renderWithRouter(<MainEmpty/>);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Dusseldorf')).toBeInTheDocument();
  });

  it('should render header with logo', () => {
    renderWithRouter(<MainEmpty/>);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render cities list', () => {
    renderWithRouter(<MainEmpty/>);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });
});
