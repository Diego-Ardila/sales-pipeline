import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { cleanup, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Customer, { loader as customerLoader } from './Customer';
import { randomNumber } from '../utils/MockValidationsServer';

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
      const status = await screen.findAllByTestId('status-metadata');
      //With this we can check the random number brought from the internalValidation mock server
      console.log('internal validation number: ', randomNumber);
      
      if(randomNumber >= 60) {
        waitFor(async() => expect(stage).toHaveTextContent('Prospect'));
      } else {
        expect(stage).toHaveTextContent('Lead');
        waitFor(async() => expect(status[0]).toHaveTextContent('Rejected'));
      }
    })

    test('When customer exists in national registry but has a judicial record', async () => {
      const router = createMemoryRouter([
        {
          path: "customer/:customerId",
          element: <Customer />,
          loader: customerLoader
        }
      ], {
        initialEntries: ['/customer/4567890123'],
        initialIndex: 0
      })
      render(<RouterProvider router={router} />);

      const validationsButton = await screen.findByRole('button', {name: /validate customer/i});
      act(() => { userEvent.click(validationsButton); })
      const stage = await screen.findByTestId('stage-metadata');
      const status = await screen.findAllByTestId('status-metadata');
      
      waitFor(async() =>{
        expect(status).toHaveTextContent('Rejected')
        expect(stage).toHaveTextContent('Lead');
      });
    })

    test('When customer doesnt exist in national registry but doesnt have any judicial record', async () => {
      const router = createMemoryRouter([
        {
          path: "customer/:customerId",
          element: <Customer />,
          loader: customerLoader
        }
      ], {
        initialEntries: ['/customer/0987654321'],
        initialIndex: 0
      })
      render(<RouterProvider router={router} />);

      const validationsButton = await screen.findByRole('button', {name: /validate customer/i});
      act(() => { userEvent.click(validationsButton); })
      const stage = await screen.findByTestId('stage-metadata');
      const status = await screen.findAllByTestId('status-metadata');
      
      waitFor(async() =>{
        expect(status).toHaveTextContent('Rejected')
        expect(stage).toHaveTextContent('Lead');
      });
    })
  })
  
});