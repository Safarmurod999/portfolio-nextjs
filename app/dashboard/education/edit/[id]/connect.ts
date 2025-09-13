import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectEducation } from "@/app/store/selectors/education";
import {
  fetchEducationDetail,
  updateEducationData,
} from "@/app/store/slices/educationSlice";
import { Education } from "@/app/types/store/education";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { detail, isLoading, error } = useSelector(selectEducation);

  const handleUpdate = (values: Omit<Education, "id">) => {
    dispatch(
      updateEducationData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateEducationData/fulfilled") {
        toast.success("Education updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateEducationData/rejected") {
        toast.error("Error updating education", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: detail?.name,
      place: detail?.place,
      date: detail?.date,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchEducationDetail(id as string));
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
