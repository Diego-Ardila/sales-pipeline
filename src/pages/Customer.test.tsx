import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Customer, { loader as customerLoader } from './Customer';
import * as RequestsModule from '../api/httpRequests';
import CustomerDb from '../utils/Customers.json'
import { Customer as CustomerType } from '../utils/Types';
import { act } from 'react-dom/test-utils';

jest.setTimeout(25000);

describe('Customer Page', () => {
  beforeEach(() => {    
    cleanup();
  });

  test('renders user data', async () => {
    const router = createMemoryRouter([
      {
        path: "customer/:customerId",
        element: <Customer />,
        loader: customerLoader
      }
    ], {
      initialEntries: ['/customer/1234567890'],
      initialIndex: 0
    })
    render(<RouterProvider router={router} />);

    const header = await screen.findByRole('heading', {name: /John/i});
    const nationalId = await screen.findByText('1234567890');
    const stage = await screen.findAllByText(/lead/i);
    expect(header).toBeInTheDocument();
    expect(nationalId).toBeInTheDocument();
    expect(stage.length).toBe(2);
  });

  describe('Apply the right validations for lead customer to become prospect', () => {
    test('When customer exists in national registry and doesnt have any judicial record', async () => {
      jest.spyOn(RequestsModule, 'internalValidation').mockResolvedValue(true)
      const router = createMemoryRouter([
        {
          path: "customer/:customerId",
          element: <Customer />,
          loader: customerLoader
        }
      ], {
        initialEntries: ['/customer/1234567890'],
        initialIndex: 0
      })
      render(<RouterProvider router={router} />);

      const validationsButton = await screen.findByRole('button', {name: /validate customer/i});
      act(() => { userEvent.click(validationsButton); })
      const stage = await screen.findByTestId('stage-metadata');
      await waitFor(async() => expect(stage).toHaveTextContent('Prospect'), {timeout: 15000});
    })
  })
  
});