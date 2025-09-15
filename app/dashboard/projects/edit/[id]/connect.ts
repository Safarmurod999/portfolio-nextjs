import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectProjects } from "@/app/store/selectors/projects";
import {
  fetchProjectDetail,
  updateProjectData,
} from "@/app/store/slices/projectsSlice";
import { Projects } from "@/app/types/store/projects";
import { toast } from "sonner";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";
import { fetchTechnologyData } from "@/app/store/slices/technologiesSlice";
import { selectTechnologies } from "@/app/store/selectors/technologies";
import { selectCategory } from "@/app/store/selectors/categories";

const fixTechnologies = (str: string) => {
  if (!str) return [];
  return str
    .replace(/[{}]/g, "")
    .split(",")
    .map((s) => s.replace(/"/g, "").trim());
};

const useConnect = () => {
  let technologyList, categoryList;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

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
  const { detail, isLoading, error } = useSelector(selectProjects);

  const handleUpdate = (values: Omit<Projects, "id" | "active">) => {
    const formData = new FormData();

    formData.append("id", id as string);
    if (values.title) formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.link) formData.append("link", values.link);
    if (values.category_id)
      formData.append("category_id", values.category_id.toString());
    if (values.technologies)
      formData.append("technologies", JSON.stringify(values.technologies));
    if (values.image && typeof values.image !== "string") {
      formData.append("image", values.image);
    }
    dispatch(
      updateProjectData({
        params: formData,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateProjectData/fulfilled") {
        toast.success("Project updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateProjectData/rejected") {
        toast.error("Error updating project", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: detail?.title,
      description: detail?.description,
      link: detail?.link,
      image: detail?.image,
      category_id: detail?.category_id,
      technologies: fixTechnologies(detail?.technologies),
      date: detail?.date,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchTechnologyData({ name: "" }));
    dispatch(fetchCategoryData({ name: "" }));
    dispatch(fetchProjectDetail(id as string));
  }, [dispatch]);

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
  return {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    isLoading,
    handleImage,
    error,
    technologyList,
    categoryList,
  };
};

export default useConnect;
