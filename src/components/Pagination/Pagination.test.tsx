import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import Pagination from './Pagination';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ search: '?page=1' })),
  };
});

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    const navigate = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => navigate(`?page=${page}`)}
          hasResults={true}
        />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('?page=2');
  });
});
