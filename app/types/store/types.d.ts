export {};
declare global {
  interface DataState<T, U> {
    userData: T | null;
    data: T[] | null;
    isLoading: boolean;
    error: string | null;
    filter: U;
  }

}
