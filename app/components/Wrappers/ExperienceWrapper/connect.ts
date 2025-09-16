import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectExperience } from "@/app/store/selectors/experience";
import {
  deleteExperienceData,
  fetchExperienceData,
  setCompanyFilter,
  updateExperienceData,
} from "@/app/store/slices/experienceSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [company, setCompany] = useState(searchParams.get("company") || "");

  const { data, isLoading, error, filter } = useSelector(selectExperience);
   
  const handleDelete = (id: number) => {
    dispatch(deleteExperienceData(id)).then((res) => {
      if (res.type === "data/deleteExperienceData/fulfilled") {
        toast.success("Experience deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteExperienceData/rejected") {
        toast.error("Error deleting experience", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  const createQueryString = useCallback(
    (company: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(company, value);
      return newParams.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (!company.trim()) {
      router.push(pathname);
    }
  }, [company, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.trim()) {
      router.push(pathname + "?" + createQueryString("company", company));
    }
    dispatch(setCompanyFilter(company));
  };

  const handleFilterReset = () => {
    setCompany("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateExperienceData({
        params: { active },
        id: +id,
      })
    ).then((res) => {
      if (res.type === "data/updateExperienceData/fulfilled") {
        toast.success("Experience updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateExperienceData/rejected") {
        toast.error("Error updating experience", {
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
    dispatch(fetchExperienceData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    experience: data,
    isLoading,
    handleDelete,
    handleSearch,
    company,
    handleSubmit,
    handleUpdate,
    handleFilterReset
  };
};

export default useConnect;
