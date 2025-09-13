import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addCategoryData } from "@/app/store/slices/categoriesSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: Omit<Category, "id" | "active">) => {
    dispatch(addCategoryData(values)).then((res) => {
      if (res.type === "data/addCategoryData/fulfilled") {
        toast.success("Category created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addCategoryData/rejected") {
        toast.error("Error creating category", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
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
