import { Customer, TableProps } from '../utils/Types';
import './Table.css';

function Table({customers}: TableProps) {  
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
          {customers.length ? customers.map((val: Customer, key: number) => {
            return (
              <tr key={key} className='users-rows'>
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
          }): (
            <tr>
              <td className='no-results-row' align="center" colSpan={4}>
                No elements to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
  );
}

export default Table;
