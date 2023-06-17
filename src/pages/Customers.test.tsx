import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Customers from './Customers';
import { getCustomers } from '../api/httpRequests';
import CustomersDb from '../utils/Customers.json'
import { Customer } from '../utils/Types';
import { act } from 'react-dom/test-utils';

jest.mock('../api/httpRequests');
jest.mock('../utils/MockValidationsServer');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customers />,
    loader: () => CustomersDb
  }
])

describe('Customers Page', () => {
  beforeEach(() => {
    CustomersDb[0] = {...CustomersDb[0], stage: 'Prospect'};
    
    (getCustomers as jest.MockedFunction<typeof getCustomers>).mockResolvedValue(CustomersDb as Customer[]);
    render(<RouterProvider router={router} />);
  });

  test('renders without crashing', () => {
    const header = screen.getByRole('heading', {name: /customers/i});
    expect(header).toBeInTheDocument();
  });

  test('renders all the customers brought from the request', async () => {
    const tableRows = await screen.findAllByRole('row');
    expect(tableRows.length).toBe(21);
  })

  test('displays correct number of customers', async () => {
    const totalCustomers = await screen.findByRole('heading', {name: /20/i});
    expect(totalCustomers).toBeInTheDocument();
  });

  test('filters customers based on stage', async () => {
    const filterButton = screen.getByRole('button', {name: /filter/i});
    userEvent.click(filterButton);

    const leadOption = await screen.findByTestId("dropdown-Prospect");
    act(() => { userEvent.click(leadOption); })
    
    expect(getCustomers).toHaveBeenCalledWith(['Prospect']);
  });
});