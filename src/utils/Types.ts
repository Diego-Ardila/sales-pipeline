export type Status = "Active" | "Rejected";

export type Stage = "Lead" | "Prospect" | "Negotiation" | "Contract";

export type ValidationStates = "loading" | "pending" | "approved" | "rejected"

export type Step = {
  text: string;
  state: "active" | "passed" | "pending"
}

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: number | string;
  birthdate: string;
  status: Status;
  stage: Stage;
  image: string
}

export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  nationalId: number | string;
  birthdate: string;
}

export type PublicValidationsResponse = {
  isJudicialApproved: boolean;
  isRegistryApproved: boolean
}

export type ValidationResponse = {
  data: {
    approved: boolean
  }
}

export type OptionElement = {
  name: Stage;
  action: () => void
}

//Props types

export type TableProps = {
  customers: Customer[]
}

export type CheckboxProps = {
  isChecked: boolean,
  option: OptionElement,
}

export type DropdownProps = {
  title: string;
  icon?: JSX.Element;
  options: OptionElement[];
  filter: Stage[]
}

export type BagdeProps = {
  text: string;
  variant: 'success' | 'danger'
}

export type MultistepProps = {
  steps: Step[];
}