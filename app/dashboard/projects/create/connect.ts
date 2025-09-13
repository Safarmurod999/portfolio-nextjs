import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addProjectData } from "@/app/store/slices/projectsSlice";
import { toast } from "sonner";
import { Projects } from "@/app/types/store/projects";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCreate = (values: Omit<Projects, "id" | "active">) => {
    dispatch(addProjectData(values)).then((res) => {
      if (res.type === "data/addProjectData/fulfilled") {
        toast.success("Project created successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addProjectData/rejected") {
        toast.error("Error creating project", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      description: "",
      link: "",
      image: "",
      category_id: 0,
      technologies: [],
      active: false,
    },
    onSubmit: handleCreate,
    enableReinitialize: true,
  });

  return {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
  };
};

export default useConnect;
