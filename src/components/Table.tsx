import { useNavigate } from 'react-router-dom';
import { Customer, TableProps } from '../utils/Types';
import Badge from './Badge';
import './Table.css';

function Table({customers}: TableProps) {
  const navigate = useNavigate();
  return (
      <table className="custom-table">
        <thead>
          <tr>
            <th className='customer-col'>Customer</th>
            <th className='stage-col'>Stage</th>
            <th className='status-col'>Status</th>
            <th className='email-col'>Email</th>
            <th className='birthdate-col'>Birthdate (YY-MM-DD)</th>
          </tr>
        </thead>
        <tbody>
          {customers.length ? customers.map((val: Customer, key: number) => {
            return (
              <tr key={key} className='users-rows' onClick={() => {navigate(`customer/${val.nationalId}`)}}>
                <td className='customer-col'>
                  <div className='user-cell'>
                    <img src={val.image} className="user-img" alt="User image" />
                    <span>{val.firstName}</span>
                    &nbsp;
                    <span>{val.lastName}</span>
                  </div>
                </td>
                <td className='stage-col'>{val.stage}</td>
                <td className='status-col'>
                  <Badge
                    text={val.status}
                    variant={val.status === 'Active' ? 'success' : 'danger'}
                  />
                </td>
                <td className='email-col'>{val.email}</td>
                <td className='birthdate-col'>{val.birthdate}</td>
              </tr>
            )
          }): (
            <tr>
              <td className='no-results-row' align="center" colSpan={5}>
                No elements to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
  );
}

export default Table;
