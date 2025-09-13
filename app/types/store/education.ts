export interface Education {
  id: number;
  name: string;
  date: string;
  place: string;
  active?: boolean;
}

export interface EducationFilter {
  name: string;
}

export interface AddEducationDataPayload {
  name: string;
  date: string;
  place: string;
  active?: boolean;
}

export interface AddEducationDataPayload {
  name: string;
  date: string;
  place: string;
  active?: boolean;
}

export interface UpdateEducationDataPayload {
  id: string | number;
  params: {
    name?: string;
    date?: string;
    place?: string;
    active?: boolean;
  };
}
