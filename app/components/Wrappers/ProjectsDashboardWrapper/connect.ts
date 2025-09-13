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
  const [name, setName] = useState(searchParams.get("name") || "");

  const { data, isLoading, error, filter } = useSelector(selectProjects);
  console.log(data);

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
    setName(e.target.value);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(name, value);
      return newParams.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (!name.trim()) {
      router.push(pathname);
    }
  }, [name, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(pathname + "?" + createQueryString("name", name));
    }
    dispatch(setTitleFilter(name));
  };

  const handleFilterReset = () => {
    setName("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateProjectData({
        params: { active },
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
    dispatch(fetchProjectData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    projects: data,
    isLoading,
    handleDelete,
    handleSearch,
    name,
    handleSubmit,
    handleUpdate,
    handleFilterReset,
  };
};

export default useConnect;
