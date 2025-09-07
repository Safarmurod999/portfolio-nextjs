import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addUserData } from "@/app/store/slices/userSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: any) => {
    dispatch(addUserData(values));
    toast.success("User created successfully", {
      position: "top-right",
      duration: 2000,
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
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
