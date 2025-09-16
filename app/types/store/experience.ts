export interface Experience {
  id: number;
  company: string;
  date: string;
  jobTitle: string;
  active: boolean;
}

export interface ExperienceFilter {
  company: string;
}

export interface AddExperienceDataPayload {
  company: string;
  date: string;
  jobTitle: string;
  active?: boolean;
}

export interface UpdateExperienceDataPayload {
  id: string | number;
  params: {
    company?: string;
    date?: string;
    jobTitle?: string;
    active?: boolean;
  };
}
