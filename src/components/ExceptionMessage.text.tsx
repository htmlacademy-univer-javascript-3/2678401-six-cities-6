import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import ExceptionMessage from './ExceptionMessage.tsx';

describe('ErrorMessage component', () => {
  it('should render component with message prop', () => {
    const message = 'Test error message';
    render(<ExceptionMessage message={message}/>);

    expect(screen.getByText('Произошла ошибка загрузки данных')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText('There may be problems with your internet connection, try checking your connection and refreshing the page.')).toBeInTheDocument();
  });

  it('should display the passed message', () => {
    const customMessage = 'Custom error message for testing';
    render(<ExceptionMessage message={customMessage}/>);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
