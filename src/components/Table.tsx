import './Table.css';
import { Customer } from '../utils/Types';
import { getCustomers } from '../api/httpRequests';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  const customers = await getCustomers();
  return customers;
}

function Table() {
  const customers: Customer[] = useLoaderData() as Customer[];
  
  return (
      <table className="custom-table">
        <thead>
          <tr>
            <th className='customer-col'>Customer</th>
            <th className='status-col'>Status</th>
            <th className='email-col'>Email</th>
            <th className='birthdate-col'>Birthdate (YY-MM-DD)</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((val: Customer, key: number) => {
            return (
              <tr key={key}>
                <td className='customer-col'>
                  <div className='user-cell'>
                    <img src={val.image} className="user-img" alt="User image" />
                    <span>{val.firstName}</span>
                    &nbsp;
                    <span>{val.lastName}</span>
                  </div>
                </td>
                <td className='status-col'>{val.status}</td>
                <td className='email-col'>{val.email}</td>
                <td className='birthdate-col'>{val.birthdate}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
  );
}

export default Table;
