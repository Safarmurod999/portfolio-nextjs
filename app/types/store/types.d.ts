export {};
declare global {
  interface DataState {
    userData: any;
    data: any;
    isLoading: boolean;
    error: string | null;
    filter: {
      username: string;
    };
  }

  interface FetchUserDataPayload {
    apiEndpoint: string;
  }

  interface FetchDetailedDataPayload {
    apiEndpoint: string;
    id: number;
  }

  interface AddUserDataPayload {
    username: string;
    password: string;
    active?: boolean;
  }

  interface UpdateUserDataPayload {
    id: number;
    newData: {
      username?: string;
      password?: string;
      active?: boolean;
    };
    // accessToken: string;
  }
}
