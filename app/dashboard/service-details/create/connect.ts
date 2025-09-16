import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { toast } from "sonner";
import { useEffect } from "react";
import { addServiceDetailsData } from "@/app/store/slices/serviceDetailsSlice";
import { selectServices } from "@/app/store/selectors/services";
import { fetchServiceData } from "@/app/store/slices/servicesSlice";

const useConnect = () => {
  let serviceList;
  const dispatch = useDispatch<AppDispatch>();

  const { data: service, isLoading } = useSelector(selectServices);
  if (!isLoading && service) {
    serviceList = service.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    }));
  }
  const handleCreate = (values: any) => {
    dispatch(addServiceDetailsData(values)).then((res) => {
      if (res.type === "data/addServiceDetailsData/fulfilled") {
        toast.success("Service detail created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addServiceDetailsData/rejected") {
        toast.error("Error creating service detail", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      service_id: 0,
      active: false,
    },
    onSubmit: handleCreate,
    enableReinitialize: true,
  });
  useEffect(() => {
    dispatch(fetchServiceData({ name: "" }));
  }, [dispatch]);
  return {
    handleSubmit,
    handleChange,
    values,
    serviceList,
  };
};

export default useConnect;
