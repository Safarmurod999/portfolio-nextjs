"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectExperience } from "@/app/store/selectors/experience";
import { useEffect } from "react";
import { fetchExperienceData } from "@/app/store/slices/experienceSlice";
import { AppDispatch } from "@/app/store/store";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: experience, isLoading: experienceLoading } =
    useSelector(selectExperience);

  useEffect(() => {
    dispatch(fetchExperienceData({ company: "" }));
  }, [dispatch]);

  return { experience, experienceLoading };
};

export default useConnect;
