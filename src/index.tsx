import React, { Children } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/ErrorPage';
import Customers from './pages/Customers';
import Customer from './pages/Customer';
import { loader as customersLoader } from './components/Table';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "customers",
        element: <Customers />,
        loader: customersLoader
      },
      {
        path: "customer/:customerId",
        element: <Customer />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
