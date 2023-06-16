import { useCallback, useState } from 'react';
import { getCustomer, internalValidation, publicValidation } from '../api/httpRequests';
import { ActionFunctionArgs, ParamParseKey, Params, useLoaderData } from 'react-router-dom';
import { Customer as CustomerType, Step, ValidationStates } from '../utils/Types';
import Badge from '../components/Badge';
import { MdCancel, MdCheckCircle, MdOutlineEmail, MdPending } from "react-icons/md";
import Multistep from '../components/Multistep';
import Loader from '../components/Loader';
import './Customer.css';

const PathNames = {
  todoDetail: '/customer/:customerId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.todoDetail>>;
}

export async function loader({ params }: Args) {
  if (!params.customerId) {
    return {};
  }
  const customer = await getCustomer(params.customerId);
  return customer;
}

function Customer() {
  const customerDb: CustomerType = useLoaderData() as CustomerType;
  const [customer, setCustomer] = useState<CustomerType>(customerDb);
  const [nationalRegistryState, setNationalRegistryState] = useState<ValidationStates>('pending');
  const [judicialRecordsState, setJudicialRecordsState] = useState<ValidationStates>('pending');
  const [internalValidationState, setInternalValidationState] = useState<ValidationStates>('pending');

  const steps: () => Step[] = useCallback(() => {
    const stepsTemplate: Step[] = [
      { text: 'Lead', state: 'pending' },
      { text: 'Prospect', state: 'pending' },
      { text: 'Negotiation', state: 'pending' },
      { text: 'Contract', state: 'pending' }
    ];
    let isActiveFound: boolean = false;

    return stepsTemplate.map((step: Step) => {
      if (isActiveFound) {
        return step;
      } else if (step.text === customer.stage) {
        isActiveFound = true;
        return { ...step, state: 'active' }
      }
      return { ...step, state: 'passed' }
    })
  }, [customer]);

  const isValidating = (): boolean => {
    return nationalRegistryState === 'loading' ||
      judicialRecordsState === 'loading' ||
      internalValidationState === 'loading'
  }

  const handleClick = async () => {
    setJudicialRecordsState("loading");
    setNationalRegistryState("loading");
    setInternalValidationState("pending");
    const { isJudicialApproved, isRegistryApproved } = await publicValidation(customer);
    if (!isJudicialApproved || !isRegistryApproved) {
      setJudicialRecordsState(!isJudicialApproved ? "rejected" : "approved");
      setNationalRegistryState(!isRegistryApproved ? "rejected" : "approved");
    } else {
      setJudicialRecordsState("approved");
      setNationalRegistryState("approved");
      setInternalValidationState("loading");
      const isValid: boolean = await internalValidation(customer);
      if (isValid) {
        setInternalValidationState("approved");
      } else {
        setInternalValidationState("rejected");
      }
    }
    const customerUpdated = await getCustomer(customer.nationalId);
    setCustomer(customerUpdated);
  }

  const iconMapper: (state: ValidationStates) => JSX.Element = (state) => {
    switch (state) {
      case "approved":
        return <MdCheckCircle />;
      case "loading":
        return <Loader />;
      case "rejected":
        return <MdCancel />;
      default:
        return <MdPending />;
    }
  };

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
        <Multistep steps={steps()} />
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
            {customer.stage === 'Lead' ? (
              <div className="lead-validation">
                <ul className="validations-status">
                  <li className={nationalRegistryState}>
                    {iconMapper(nationalRegistryState)}
                    National registry validation
                  </li>
                  <li className={judicialRecordsState}>
                    {iconMapper(judicialRecordsState)}
                    Judicial records validation
                  </li>
                  <li className={internalValidationState}>
                    {iconMapper(internalValidationState)}
                    Internal prospect qualification
                  </li>
                </ul>
                <button disabled={isValidating()} onClick={handleClick} className="validate-btn">
                  Validate customer
                  {isValidating() ? <Loader color="white" /> : null}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Customer;
