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
    newData: any;
  }

  interface UpdateDataPayload {
    apiEndpoint: string;
    id: number;
    newData: any;
    // accessToken: string;
  }

  interface DeleteDataPayload {
    apiEndpoint: string;
    id: number;
  }
}
