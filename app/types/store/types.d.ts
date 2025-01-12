export {};
declare global {
  interface DataState {
    data: any;
    isLoading: boolean;
    error: string | null;
  }

  interface FetchDataPayload {
    apiEndpoint: string;
  }

  interface AddDataPayload {
    apiEndpoint: string;
    newData: User | Category | Education | Lead;
  }

  interface UpdateDataPayload {
    apiEndpoint: string;
    id: number;
    newData: { active: boolean } | User | Category | Education | Lead;
    // accessToken: string;
  }

  interface DeleteDataPayload {
    apiEndpoint: string;
    id: number;
  }
}
