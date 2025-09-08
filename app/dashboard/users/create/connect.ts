import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addUserData } from "@/app/store/slices/userSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: Omit<User, "id" | "active">) => {
    dispatch(addUserData(values)).then((res) => {
      console.log(res);
      
      if (res.type === "data/addUserData/fulfilled") {
        toast.success("User created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addUserData/rejected") {
        toast.error("Error creating user", {
          position: "bottom-right",
          duration: 2000,
        });
      }
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
