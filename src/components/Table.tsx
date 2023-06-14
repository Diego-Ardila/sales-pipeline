import './Table.css';
import Leads from '../utils/Leads.json';

function Table() {

  return (
      <table className="custom-table">
        <thead>
          <tr>
            <th className='customer-col'>Customer</th>
            <th className='status-col'>Status</th>
            <th className='email-col'>Email</th>
            <th className='birthdate-col'>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {Leads.leads.map((val, key) => {
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
