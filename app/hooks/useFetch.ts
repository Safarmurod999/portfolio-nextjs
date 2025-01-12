import { useState, useEffect } from "react";

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, options);
        console.log(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: T = await response.json();

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error: any) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error.message || "Something went wrong",
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/mainSlice";
import { AppDispatch, RootState } from "../store/store";

export const useFetchData = (apiEndpoint: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.data
  );
  
  useEffect(() => {
    if (apiEndpoint) {
      dispatch(fetchData({ apiEndpoint }));
    }
  }, [apiEndpoint, dispatch]);

  return { data, isLoading, error };
};
