import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addExperienceData } from "@/app/store/slices/experienceSlice";
import { toast } from "sonner";
import { AddExperienceDataPayload } from "@/app/types/store/experience";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: AddExperienceDataPayload) => {
    dispatch(addExperienceData(values)).then((res) => {
      if (res.type === "data/addExperienceData/fulfilled") {
        toast.success("Experience created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addExperienceData/rejected") {
        toast.error("Error creating experience", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      company: "",
      jobTitle: "",
      date: "",
    },
    onSubmit: handleCreate,
    enableReinitialize: true,
  });

  return {
    handleSubmit,
    handleChange,
    values,
  };
};

export default useConnect;
