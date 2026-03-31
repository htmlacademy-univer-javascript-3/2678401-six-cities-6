import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorNotFound} from './ErrorNotFound.tsx';

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('Error page', () => {
  it('should render error page with 404 message', () => {
    renderWithRouter(<ErrorNotFound/>);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should render link to main page', () => {
    renderWithRouter(<ErrorNotFound/>);

    const link = screen.getByText('Back on Main');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
