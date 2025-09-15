export interface Technology {
  id: number;
  name: string;
  icon: string;
  category_id: number;
  active: boolean;
}

export interface TechnologyFilter {
  name: string;
}

export interface AddTechnologyDataPayload {
  name: string;
  icon: string;
  category_id: number;
  active?: boolean;
}

export interface UpdateTechnologyDataPayload {
  id: string | number;
  params: {
    name?: string;
    icon?: string;
    category_id?: number;
    active?: boolean;
  };
}

