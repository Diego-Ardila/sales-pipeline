import { Customer, PublicValidationsResponse, Stage, ValidationResponse } from '../utils/Types';
import { api as validationApi } from '../utils/MockValidationsServer';
import { api } from '../utils/MockServer';

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
    ]: ValidationResponse[] = await Promise.all([judicialRecords, nationalRegistry])
    
    return {
      isJudicialApproved: judicialRecordsResponse.data.approved,
      isRegistryApproved: nationalRegistryResponse.data.approved
    };
  } catch (error) {
    throw error;
  }
}

export async function getCustomers(stage: Stage[]): Promise<Customer[]> {
  try {
    if(!stage.length) {
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