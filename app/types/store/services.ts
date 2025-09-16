import { Category } from "./categories";
export interface Service {
  id: number;
  name: string;
  category: Category;
  active?: boolean;
}

export interface ServiceFilter {
  name: string;
}

export interface AddServiceDataPayload {
  name: string;
  category_id: number;
  active?: boolean;
}

export interface UpdateServiceDataPayload {
  id: string | number;
  params: {
    name?: string;
    active?: boolean;
  };
}
