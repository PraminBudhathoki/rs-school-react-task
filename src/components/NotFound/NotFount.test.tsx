import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('renders 404 page with message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404 - Page Not Found!')).toBeInTheDocument();

    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders a link to go back home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go back home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
