import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LeadsDb from './Customers.json';

export const api: AxiosInstance = axios.create({
  paramsSerializer: {
    indexes: null
  }
});
const mock: MockAdapter = new MockAdapter(api, { delayResponse: 200 });

mock.onGet('/api/customers').reply((config) => {  
  if(!config.params) {
    return [200, { leads: LeadsDb }]
  }
  const filteredData = LeadsDb.filter(lead => config.params.status.includes(lead.status));
  return [200, {leads: filteredData}]
})