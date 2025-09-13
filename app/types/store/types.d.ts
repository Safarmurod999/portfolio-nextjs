export {};
declare global {
  interface DataState<T, U> {
    detail: T | null;
    data: T[] | null;
    isLoading: boolean;
    error: string | null;
    filter: U;
  }

}
