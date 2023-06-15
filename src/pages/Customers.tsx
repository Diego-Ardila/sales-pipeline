import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DropdownButton from '../components/DropdownButton';
import Table from '../components/Table';
import { Customer, OptionElement, Status } from '../utils/Types';
import { getCustomers } from '../api/httpRequests';
import { useLoaderData } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";
import './Customers.css';

export async function loader() {
  const customers = await getCustomers([]);
  return customers;
}

function actionGenerator(status: Status, setFilter: Dispatch<SetStateAction<Status[]>>): () => void {
  return () => {
    setFilter(prev => {
      if(prev.includes(status)) {
        return prev.filter(prevStatus => prevStatus !== status);
      }
      return [...prev, status]
    });
  }
}

function Customers() {
  const dbCustomers: Customer[] = useLoaderData() as Customer[];
  const[customers, setCustomers] = useState<Customer[]>(dbCustomers);
  const[filter, setFilter] = useState<Status[]>([]);

  useEffect(() => {    
    const fetchData = async () => {
      const customers = await getCustomers(filter);
      setCustomers(customers);
    }
    fetchData()
      .catch(console.error);
  }, [filter])

  const options: OptionElement[] = [
    {name: "Sales Qualified Lead", action: actionGenerator("Sales Qualified Lead", setFilter)},
    {name: "Prospect", action: actionGenerator("Prospect", setFilter)}
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
          filter={filter}
        />
      </div>
      <Table customers={customers}/>
    </div>
  );
}

export default Customers;
