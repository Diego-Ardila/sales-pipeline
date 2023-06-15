import { Customer, PublicValidationsResponse, Status, ValidationResponse } from '../utils/Types';
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

export async function getCustomers(status?: Status): Promise<Customer[]> {
  try {
    if(!status) {
      const response = await api.get('/api/customers');    
      return response.data.leads;
    } 
    const response = await api.get('/api/customers', {
      params: {
        status
      }
    });    
    return response.data.leads;
  } catch (error) {
    throw error;
  }
}