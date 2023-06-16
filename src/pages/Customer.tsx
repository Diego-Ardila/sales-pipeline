import { getCustomer } from '../api/httpRequests';
import { ActionFunctionArgs, ParamParseKey, Params, useLoaderData } from 'react-router-dom';
import { Customer as CustomerType, Step } from '../utils/Types';
import Badge from '../components/Badge';
import { MdOutlineEmail } from "react-icons/md";
import './Customer.css';
import Multistep from '../components/Multistep';
import { useCallback } from 'react';

const PathNames = {
  todoDetail: '/customer/:customerId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.todoDetail>>;
}

export async function loader({ params }: Args) {
  if(!params.customerId) {
    return {};
  }
  const customer = await getCustomer(params.customerId);
  return customer;
}

function Customer() {
  const customer: CustomerType = useLoaderData() as CustomerType;
  const steps:() => Step[] = useCallback(() => {
    const stepsTemplate: Step[] = [
      {text: 'Lead', state: 'pending'},
      {text: 'Prospect', state: 'pending'},
      {text: 'Negotiation', state: 'pending'},
      {text: 'Contract', state: 'pending'}
    ];
    let isActiveFound: boolean = false;

    return stepsTemplate.map((step: Step) => {
      if(isActiveFound) {
        return step;
      } else if(step.text === customer.stage) {
        isActiveFound = true;
        return {...step, state: 'active'}
      }
      return {...step, state: 'passed'}
    })
  }, [customer]);

  return (
    <div className="customer">
      <header className="customer--header">
        <div className="customer--info">
          <img src={customer.image} alt="Customer picture" />
          <h3>{customer.firstName}&nbsp;{customer.lastName}</h3>
          <Badge
            text={customer.status}
            variant={customer.status === 'Active' ? 'success' : 'danger'}
          />
        </div>
        <a href={`mailto:${customer.email}`}>
          <button>
            <MdOutlineEmail />
            Send email
          </button>
        </a>
      </header>
      <section className="customer--body">
        <Multistep steps={steps()}/>
        <div className="customer--detail">
          <div className="detail--header">
            Detail
          </div>
          <div className="detail--body">
            <div className="detail--national-id">
              <h4>National id</h4>
              <span>{customer.nationalId}</span>
            </div>
            <div className="detail--status">
              <h4>Current status</h4>
              <Badge
                text={customer.status}
                variant={customer.status === 'Active' ? 'success' : 'danger'}
              />
            </div>
            <div className="detail--stage">
              <h4>Stage</h4>
              <span>{customer.stage}</span>
            </div>
            <div className="detail--assignee">
              <h4>Assignee</h4>
              <div>
                <img src="/generic-user-icon.jpg" className="user-img" alt="User image" />
                <span>User name</span>
              </div>
            </div>
            <button className="validate-btn">
              Validate customer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Customer;
