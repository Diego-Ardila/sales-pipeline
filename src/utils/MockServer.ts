import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LeadsDb from './Customers.json';

export const api: AxiosInstance = axios.create();
const mock: MockAdapter = new MockAdapter(api, { delayResponse: 200 });

mock.onGet('/api/customers').reply(200, {
  leads: LeadsDb
})