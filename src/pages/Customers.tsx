import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import DropdownButton from '../components/DropdownButton';
import Table from '../components/Table';
import { Customer, OptionElement, Stage } from '../utils/Types';
import { getCustomers } from '../api/httpRequests';
import { useLoaderData } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";
import './Customers.css';

export async function loader() {
  const customers = await getCustomers([]);
  return customers;
}

function actionGenerator(stage: Stage, setFilter: Dispatch<SetStateAction<Stage[]>>): () => void {
  return () => {
    setFilter(prev => {
      if(prev.includes(stage)) {
        return prev.filter(prevStage => prevStage !== stage);
      }
      return [...prev, stage]
    });
  }
}

function Customers() {
  const dbCustomers: Customer[] = useLoaderData() as Customer[];
  const[customers, setCustomers] = useState<Customer[]>(dbCustomers);
  const[filter, setFilter] = useState<Stage[]>([]);

  useEffect(() => {    
    const fetchData = async () => {
      const customers = await getCustomers(filter);
      setCustomers(customers);
    }
    fetchData()
      .catch(console.error);
  }, [filter])

  const options: OptionElement[] = [
    {name: "Lead", action: actionGenerator("Lead", setFilter)},
    {name: "Prospect", action: actionGenerator("Prospect", setFilter)},
    {name: "Negotiation", action: actionGenerator("Negotiation", setFilter)},
    {name: "Contract", action: actionGenerator("Contract", setFilter)}
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
