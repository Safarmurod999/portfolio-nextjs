import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addTechnologyData } from "@/app/store/slices/technologiesSlice";
import { toast } from "sonner";
import { Technology } from "@/app/types/store/technologies";
import { selectCategory } from "@/app/store/selectors/categories";
import { useEffect } from "react";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";

const useConnect = () => {
  let categories;
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error, filter } = useSelector(selectCategory) as {
    data: any[];
    isLoading: boolean;
    error: any;
    filter: any;
  };

  if (!isLoading && data) {
    categories = data.map((el) => ({ value: el.id, label: el.name }));
  }
  const handleCreate = (values: Omit<Technology, "id" | "active">) => {
    dispatch(addTechnologyData(values)).then((res) => {
      if (res.type === "data/addTechnologyData/fulfilled") {
        toast.success("Technology created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addTechnologyData/rejected") {
        toast.error("Error creating technology", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      icon: "",
      category_id: 0,
    },
    onSubmit: handleCreate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchCategoryData(filter.name || ""));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    categories,
  };
};

export default useConnect;
