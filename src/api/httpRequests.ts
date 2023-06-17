import { Customer, PublicValidationsResponse, Stage, Status, ValidationResponse } from '../utils/Types';
import { api as validationApi } from '../utils/MockValidationsServer';
import { api } from '../utils/MockServer';

type CustomerProperties = {
  status?: Status;
  stage?: Stage
}

function setCustomerProperties(properties: CustomerProperties, data: Customer) {
  const localStorageCustomers: string | null = localStorage.getItem('customers');
  if (localStorageCustomers) {
    const customersDb: Customer[] = JSON.parse(localStorageCustomers);
    const newCustomersDb: Customer[] = customersDb.map(customer => {
      if (customer.nationalId === data.nationalId) {
        return {
          ...customer,
          ...properties
        }
      }
      return customer;
    });
    localStorage.setItem('customers', JSON.stringify(newCustomersDb));
  }
}

export async function publicValidation(data: Customer): Promise<PublicValidationsResponse> {
  try {
    const judicialRecords: Promise<ValidationResponse> = validationApi.get('/api/judicial-records', {
      params: {
        nationalId: data.nationalId,
      }
    });

    const nationalRegistry: Promise<ValidationResponse> = validationApi.get('/api/national-registry', {
      params: {
        nationalId: data.nationalId,
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: data.birthdate
      }
    });
    const [
      judicialRecordsResponse,
      nationalRegistryResponse
    ]: ValidationResponse[] = await Promise.all([judicialRecords, nationalRegistry]);

    if (!judicialRecordsResponse.data.approved || !nationalRegistryResponse.data.approved) {
      setCustomerProperties({status: 'Rejected'}, data);
    }

    return {
      isJudicialApproved: judicialRecordsResponse.data.approved,
      isRegistryApproved: nationalRegistryResponse.data.approved
    };
  } catch (error) {
    throw error;
  }
}

export async function internalValidation(data: Customer): Promise<boolean> {
  try {
    const response = await validationApi.get('/api/prospect-qualification', {
      params: {
        nationalId: data.nationalId,
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: data.birthdate
      }
    });
    const isValid = response.data.score >= 60;
    
    if(!isValid) {
      setCustomerProperties({status: 'Rejected'}, data);
    } else {
      setCustomerProperties({status: 'Active', stage: 'Prospect'}, data);
    }
    return isValid;
  } catch (error) {
    throw error;
  }
}

export async function getCustomers(stage: Stage[]): Promise<Customer[]> {
  try {
    if (!stage.length) {
      const response = await api.get('/api/customers');
      return response.data.customers;
    }
    const response = await api.get('/api/customers', {
      params: {
        stage
      }
    });
    return response.data.customers;
  } catch (error) {
    throw error;
  }
}

export async function getCustomer(customerId: string | number): Promise<Customer> {
  try {
    const response = await api.get('/api/customer', {
      params: {
        customerId
      }
    });
    return response.data.customer;
  } catch (error) {
    throw error;
  }
}