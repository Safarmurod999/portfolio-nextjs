"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectServices } from "@/app/store/selectors/services";
import { useEffect } from "react";
import { fetchServiceData } from "@/app/store/slices/servicesSlice";
import { AppDispatch } from "@/app/store/store";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: services, isLoading: servicesLoading } =
    useSelector(selectServices);

  useEffect(() => {
    dispatch(fetchServiceData({ name: "" }));
  }, [dispatch]);

  return { services, servicesLoading };
};

export default useConnect;
