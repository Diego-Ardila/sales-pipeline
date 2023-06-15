export type Status = "Sales Qualified Lead" | "Prospect"

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: number | string;
  birthdate: string;
  status: Status;
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
  name: Status;
  action: () => void
}

export type TableProps = {
  customers: Customer[]
}

export type CheckboxProps = {
  isChecked: boolean,
  option: OptionElement,
  onClick: (option: OptionElement) => void
}

export type DropdownProps = {
  title: string;
  icon?: JSX.Element;
  options: OptionElement[],
  filter: Status[]
}