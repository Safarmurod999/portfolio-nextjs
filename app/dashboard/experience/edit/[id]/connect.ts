import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectExperience } from "@/app/store/selectors/experience";
import {
  fetchExperienceDetail,
  updateExperienceData,
} from "@/app/store/slices/experienceSlice";
import { Experience } from "@/app/types/store/experience";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { detail, isLoading, error } = useSelector(selectExperience);

  const handleUpdate = (values: Omit<Experience, "id" | "active">) => {
    dispatch(
      updateExperienceData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateExperienceData/fulfilled") {
        toast.success("Experience updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateExperienceData/rejected") {
        toast.error("Error updating experience", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      company: detail?.company,
      jobTitle: detail?.jobTitle,
      date: detail?.date,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchExperienceDetail(id as string));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    error,
  };
};

export default useConnect;
