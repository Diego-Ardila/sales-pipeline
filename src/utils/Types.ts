export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: number | string;
  birthdate: string;
  status: "Sales Qualified Lead" | "Prospect";
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

