export interface Projects {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  category_id: number;
  technologies: number[];
  active: boolean;
}

export interface ProjectsFilter {
  title: string;
  active?: boolean;
}

export interface AddProjectDataPayload {
  title: string;
  description: string;
  link: string;
  image: string;
  category_id: number;
  technologies: number[];
  active?: boolean;
}

export interface UpdateProjectDataPayload {
  id: string | number;
  params: {
    title?: string;
    description?: string;
    link?: string;
    image?: string;
    category_id?: number;
    technologies?: number[];
    active?: boolean;
  };
}
