import { Dispatch, SetStateAction, useState } from 'react';
import DropdownButton from '../components/DropdownButton';
import Table from '../components/Table';
import { Customer, OptionElement, Status } from '../utils/Types';
import { getCustomers } from '../api/httpRequests';
import { useLoaderData } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";
import './Customers.css';

export async function loader() {
  const customers = await getCustomers();
  return customers;
}

function actionGenerator(status: Status, setCustomers:Dispatch<SetStateAction<Customer[]>>): () => void {
  return async () => {
    const customers = await getCustomers(status);
    setCustomers(customers);
  }
}

function Customers() {
  const dbCustomers: Customer[] = useLoaderData() as Customer[];
  const[customers, setCustomers] = useState<Customer[]>(dbCustomers);

  const options: OptionElement[] = [
    {name: "Sales Qualified Lead", action: actionGenerator("Sales Qualified Lead", setCustomers)},
    {name: "Prospect", action: actionGenerator("Prospect", setCustomers)}
  ]

  return (
    <div className="customers">
      <h2>Customers</h2>
      <div className='customers--subheader'>
        <div className='metadata'>
          <span>Total customers:</span>
          &nbsp;
          <h4>{customers.length}</h4>
        </div>
        <DropdownButton 
          title="Filter"
          icon={<FiFilter />}
          options={options}
        />
      </div>
      <Table customers={customers}/>
    </div>
  );
}

export default Customers;
