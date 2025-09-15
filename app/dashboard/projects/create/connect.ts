import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { addProjectData } from "@/app/store/slices/projectsSlice";
import { toast } from "sonner";
import { AddProjectDataPayload } from "@/app/types/store/projects";
import { selectTechnologies } from "@/app/store/selectors/technologies";
import { selectCategory } from "@/app/store/selectors/categories";
import { useEffect } from "react";
import { fetchTechnologyData } from "@/app/store/slices/technologiesSlice";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";

const useConnect = () => {
  let technologyList, categoryList;
  const dispatch = useDispatch<AppDispatch>();

  const { data: technologies, isLoading: techLoading } =
    useSelector(selectTechnologies);

  if (!techLoading && technologies) {
    technologyList = technologies.map((tech) => ({
      label: tech.name,
      value: tech.id.toString(),
    }));
  }
  const { data: categories, isLoading: categoryLoading } =
    useSelector(selectCategory);

  if (!categoryLoading && categories) {
    categoryList = categories.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    }));
  }

  const handleCreate = (values: AddProjectDataPayload) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("link", values.link);
    formData.append("category_id", values.category_id.toString());
    formData.append("technologies", JSON.stringify(values.technologies));
    if (values.image) {
      formData.append("image", values.image);
    }
    dispatch(addProjectData(formData)).then((res) => {
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
    const handleImage = (e) => {
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg"
    ) {
      toast.error("Only jpeg and png files are allowed", {
        position: "bottom-right",
        duration: 2000,
      });
      return;
    } else {
      setFieldValue("image", e.target.files[0]);
    }
  };
  useEffect(() => {
    dispatch(fetchTechnologyData({ name: "" }));
    dispatch(fetchCategoryData({ name: "" }));
  }, [dispatch]);
  return {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    technologyList,
    categoryList,
    handleImage,
  };
};

export default useConnect;
