import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectProjects } from "@/app/store/selectors/projects";
import {
  deleteProjectData,
  fetchProjectData,
  setTitleFilter,
  updateProjectData,
} from "@/app/store/slices/projectsSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");

  const { data, isLoading, error, filter } = useSelector(selectProjects);

  const handleDelete = (id: number) => {
    dispatch(deleteProjectData(id)).then((res) => {
      if (res.type === "data/deleteProjectData/fulfilled") {
        toast.success("Project deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteProjectData/rejected") {
        toast.error("Error deleting project", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const createQueryString = useCallback(
    (title: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(title, value);
      return newParams.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (!title.trim()) {
      router.push(pathname);
    }
  }, [title, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      router.push(pathname + "?" + createQueryString("title", title));
    }
    dispatch(setTitleFilter(title));
  };

  const handleFilterReset = () => {
    setTitle("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("active", active.toString());
    formData.append("id", id.toString());
    dispatch(
      updateProjectData({
        params: formData,
        id: +id,
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

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(fetchProjectData(filter.title ? filter : {}));
  }, [dispatch, filter]);

  return {
    projects: data,
    isLoading,
    handleDelete,
    handleSearch,
    title,
    handleSubmit,
    handleUpdate,
    handleFilterReset,
  };
};

export default useConnect;
