export interface Leads {
  id: number;
  fullname: string;
  email: string;
  message: string;
  active?: boolean;
}

export interface LeadsFilter {
  fullname: string;
}

export interface AddLeadsDataPayload {
  fullname: string;
  email: string;
  message: string;
  active?: boolean;
}

export interface UpdateLeadsDataPayload {
  id: string | number;
  params: {
    fullname?: string;
    email?: string;
    message?: string;
    active?: boolean;
  };
}
