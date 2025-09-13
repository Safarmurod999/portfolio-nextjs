export interface Category {
  id: number;
  name: string;
  active?: boolean;
}

export interface CategoryFilter {
  name: string;
  active?: boolean;
}

export interface AddCategoryDataPayload {
  name: string;
  active?: boolean;
}

export interface AddCategoryDataPayload {
  name: string;
  active?: boolean;
}

export interface UpdateCategoryDataPayload {
  id: string | number;
  params: {
    name?: string;
    active?: boolean;
  };
}
