import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectLeads } from "@/app/store/selectors/leads";
import {
  deleteLeadData,
  fetchLeadData,
  setNameFilter,
  updateLeadData,
} from "@/app/store/slices/leadsSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullname, setFullname] = useState(searchParams.get("fullname") || "");

  const { data, isLoading, error, filter } = useSelector(selectLeads);
   
  const handleDelete = (id: number) => {
    dispatch(deleteLeadData(id)).then((res) => {
      if (res.type === "data/deleteLeadData/fulfilled") {
        toast.success("Lead deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteLeadData/rejected") {
        toast.error("Error deleting lead", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
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
    if (!fullname.trim()) {
      router.push(pathname);
    }
  }, [fullname, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullname.trim()) {
      router.push(pathname + "?" + createQueryString("fullname", fullname));
    }
    dispatch(setNameFilter(fullname));
  };

  const handleFilterReset = () => {
    setFullname("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateLeadData({
        params: { active },
        id: +id,
      })
    ).then((res) => {
      if (res.type === "data/updateLeadData/fulfilled") {
        toast.success("Lead updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateLeadData/rejected") {
        toast.error("Error updating lead", {
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
    dispatch(fetchLeadData(filter.fullname ? filter : {}));
  }, [dispatch, filter]);

  return {
    leads: data,
    isLoading,
    handleDelete,
    handleSearch,
    fullname,
    handleSubmit,
    handleUpdate,
    handleFilterReset
  };
};

export default useConnect;
