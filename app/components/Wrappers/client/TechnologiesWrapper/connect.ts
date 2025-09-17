"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectTechnologies } from "@/app/store/selectors/technologies";
import { useEffect } from "react";
import { fetchTechnologyData } from "@/app/store/slices/technologiesSlice";
import { AppDispatch } from "@/app/store/store";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: technologies, isLoading: technologiesLoading } =
    useSelector(selectTechnologies);

  useEffect(() => {
    dispatch(fetchTechnologyData({ name: "" }));
  }, [dispatch]);

  return { technologies, technologiesLoading };
};

export default useConnect;
