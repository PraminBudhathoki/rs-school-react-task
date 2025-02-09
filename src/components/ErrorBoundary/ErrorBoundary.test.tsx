import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { vi } from 'vitest';

const ErrorComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary Component', () => {
  it('renders children correctly when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p data-testid="child-component">No errors here</p>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something Bad Happened!')).toBeInTheDocument();
    expect(
      screen.getByText(/An error occurred while loading this page/i)
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  it('reloads the page when the reload button is clicked', () => {
    const reloadMock = vi.spyOn(window, 'location', 'get').mockReturnValue({
      reload: vi.fn(),
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /reload page/i });
    fireEvent.click(reloadButton);

    expect(reloadMock.mock.results[0].value.reload).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
