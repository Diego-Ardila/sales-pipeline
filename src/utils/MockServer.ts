import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CustomersJSON from './Customers.json';
import { Customer } from './Types';

function customersDb():Customer[] {
  let localStorageCustomers:string |  null = localStorage.getItem('customers');
  
  if(!localStorageCustomers) {
    localStorage.setItem('customers', JSON.stringify(CustomersJSON));
    return CustomersJSON as Customer[];
  }
  return JSON.parse(localStorageCustomers);
}

export const api: AxiosInstance = axios.create({
  paramsSerializer: {
    indexes: null
  }
});
const mock: MockAdapter = new MockAdapter(api, { delayResponse: 200 });

mock.onGet('/api/customers').reply((config) => {   
  const customers = customersDb();
  if(!config.params) {
    return [200, { customers }]
  }
  const filteredData = customers.filter(customer => config.params.stage.includes(customer.stage));
  return [200, {customers: filteredData}]
})