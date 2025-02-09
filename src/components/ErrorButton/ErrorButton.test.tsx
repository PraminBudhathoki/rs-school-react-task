import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';

describe('ErrorButton Component', () => {
  it('renders the button correctly', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  it('throws an error when clicked and is caught by ErrorBoundary', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });

    fireEvent.click(button);

    expect(screen.getByText('Something Bad Happened!')).toBeInTheDocument();
    expect(
      screen.getByText(/An error occurred while loading this page/i)
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
