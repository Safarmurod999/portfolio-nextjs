import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addEducationData } from "@/app/store/slices/educationSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: Omit<Education, "id" | "active">) => {
    dispatch(addEducationData(values)).then((res) => {
      if (res.type === "data/addEducationData/fulfilled") {
        toast.success("Education created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addEducationData/rejected") {
        toast.error("Error creating education", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      place: "",
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
