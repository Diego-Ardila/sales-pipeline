import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import nationalRegistryData from './NationalRegistry.json';
import nationalJudicialRecords from './JudicialRecords.json';
import { Person } from './Types';

export const api: AxiosInstance = axios.create();
const mock: MockAdapter = new MockAdapter(api, { delayResponse: 5000 });

mock.onGet('/api/national-registry').reply((config) => {
  const { nationalId, firstName, lastName, birthdate }: Person = config.params;
  
  // Perform the matching logic here using the provided parameters
  const matchedPerson: Person | undefined = nationalRegistryData.find(person => (
      person.nationalId === nationalId &&
      person.firstName === firstName &&
      person.lastName === lastName &&
      person.birthdate === birthdate
    )
  );
  
  if (matchedPerson) {
    return [200, { approved: true }];
  } else {
    return [200, { approved: false }];
  }
});

mock.onGet('/api/judicial-records').reply((config) => {
  const { nationalId }: { nationalId: number | string } = config.params;
  
  // Perform the matching logic here using the provided parameters
  const matchedPerson: Person | undefined = nationalJudicialRecords.find(
    person => person.nationalId === nationalId
  );
  
  if (matchedPerson) {
    return [200, { approved: false }];
  } else {
    return [200, { approved: true }];
  }
});

mock.onPost('/api/prospect-qualification').reply(200, {
  score: 80,
});
