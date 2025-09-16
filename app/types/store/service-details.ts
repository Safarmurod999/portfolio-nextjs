import { Service } from "./services";

export interface ServiceDetails {
  id: number;
  name: string;
  service: Service;
  active?: boolean;
}

export interface ServiceDetailsFilter {
  name: string;
}

export interface AddServiceDetailsDataPayload {
  name: string;
  service_id: number;
  active?: boolean;
}

export interface UpdateServiceDetailsDataPayload {
  id: string | number;
  params: {
    name?: string;
    active?: boolean;
  };
}
