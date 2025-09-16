import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectServices } from "@/app/store/selectors/services";
import {
  deleteServiceData,
  fetchServiceData,
  setNameFilter,
  updateServiceData,
} from "@/app/store/slices/servicesSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");

  const { data, isLoading, error, filter } = useSelector(selectServices);

  const handleDelete = (id: number) => {
    dispatch(deleteServiceData(id)).then((res) => {
      if (res.type === "data/deleteServiceData/fulfilled") {
        toast.success("Service deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteServiceData/rejected") {
        toast.error("Error deleting service", {
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
    (name : string, value: string) => {
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
      router.push(pathname + "?" + createQueryString("name", name.trim()));
    }
    dispatch(setNameFilter(name));
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
      updateServiceData({
        params: { active },
        id: +id,
      })
    ).then((res) => {
      if (res.type === "data/updateServiceData/fulfilled") {
        toast.success("Service updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateServiceData/rejected") {
        toast.error("Error updating service", {
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
    dispatch(fetchServiceData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    services: data,
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
