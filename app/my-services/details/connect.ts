"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { fetchServiceData } from "@/app/store/slices/servicesSlice";
import { selectServices } from "@/app/store/selectors/services";
import { selectServiceDetails } from "@/app/store/selectors/service-details";
import { fetchServiceDetailsData } from "@/app/store/slices/serviceDetailsSlice";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: services, isLoading: servicesLoading } =
    useSelector(selectServices);

  const { data: serviceDetails, isLoading: serviceDetailsLoading } =
    useSelector(selectServiceDetails);

  useEffect(() => {
    dispatch(fetchServiceData({ name: "" }));
    dispatch(fetchServiceDetailsData({ name: "" }));
  }, [dispatch]);

  return { services, servicesLoading, serviceDetails, serviceDetailsLoading };
};

export default useConnect;
