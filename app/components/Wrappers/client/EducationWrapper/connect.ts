"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectEducation } from "@/app/store/selectors/education";
import { useEffect } from "react";
import { fetchEducationData } from "@/app/store/slices/educationSlice";
import { AppDispatch } from "@/app/store/store";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: education, isLoading: educationLoading } =
    useSelector(selectEducation);

  useEffect(() => {
    dispatch(fetchEducationData({ name: "" }));
  }, [dispatch]);

  return { education, educationLoading };
};

export default useConnect;
