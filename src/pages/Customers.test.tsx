import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Customers, { loader as customersLoader } from './Customers';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customers />,
    loader: () => customersLoader
  }
])

describe('Customers Page', () => {
  beforeEach(() => {
    cleanup();
    render(<RouterProvider router={router} />);
  });

  test('renders without crashing', () => {
    const header = screen.getByRole('heading', {name: /customers/i});
    expect(header).toBeInTheDocument();
  });

  test('renders all the customers brought from the request', async () => {
    const tableRows = await screen.findAllByRole('row');
    waitFor(() => { expect(tableRows.length).toBe(21); });
  })

  test('displays correct number of customers', async () => {
    const totalCustomers = await screen.findByRole('heading', {name: /20/i});
    expect(totalCustomers).toBeInTheDocument();
  });

  test('filters customers based on stage', async () => {
    const tableRows = await screen.findAllByRole('row');
    waitFor(() => { expect(tableRows.length).toBe(21); });
    const filterButton = screen.getByRole('button', {name: /filter/i});
    userEvent.click(filterButton);

    const prospectOption = await screen.findByTestId("dropdown-Prospect");
    act(() => { userEvent.click(prospectOption); })
    
    waitFor(() => { expect(tableRows.length).toBe(2); });
  });
});