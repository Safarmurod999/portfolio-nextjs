import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { toast } from "sonner";
import { useEffect } from "react";
import { addServiceData } from "@/app/store/slices/servicesSlice";
import { selectCategory } from "@/app/store/selectors/categories";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";

const useConnect = () => {
  let categoryList;
  const dispatch = useDispatch<AppDispatch>();

  const { data: categories, isLoading } = useSelector(selectCategory);
  if (!isLoading && categories) {
    categoryList = categories.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    }));
  }
  const handleCreate = (values: any) => {
    dispatch(addServiceData(values)).then((res) => {
      if (res.type === "data/addServiceData/fulfilled") {
        toast.success("Service created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addServiceData/rejected") {
        toast.error("Error creating service", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      category_id: 0,
      active: false,
    },
    onSubmit: handleCreate,
    enableReinitialize: true,
  });
  useEffect(() => {
    dispatch(fetchCategoryData({ name: "" }));
  }, [dispatch]);
  return {
    handleSubmit,
    handleChange,
    values,
    categoryList,
  };
};

export default useConnect;
