"use client";
import { useFetchData } from "@/app/hooks/useFetch";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import Pagination from "../Pagination/Pagination";
import { Form, FormBtn, FormControl, FormSwitch } from "../Form/Form";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("username") || "");

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: users,
    isLoading,
    error,
  } = useFetchData(
    `users${
      searchParams.get("username")
        ? `?username=${searchParams.get("username")}`
        : ""
    }`
  );

  const handleDelete = (id: number) => {
    dispatch(deleteData({ apiEndpoint: "users", id }));
    toast.success("User deleted successfully", {
      position: "top-right",
      duration: 2000,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
    if (!username.trim()) {
      router.push(pathname);
    }
  }, [username, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(pathname + "?" + createQueryString("username", username));
    }
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateData({
        apiEndpoint: "users",
        newData: { active },
        id: id,
      })
    );
    toast.success("User updated successfully", {
      position: "top-right",
      duration: 2000,
    });
  };
  if (error) {
    console.log(error);
  }

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-stretch">
        <Form width="[300px]" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleSearch}
            />
          <FormBtn text="Search" />
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/users/create"}
            className="form-button flex items-center text-white"
          >
            <IoAddSharp />
            <span>add</span>
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Username</th>
              <th>Passsword</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : users ? (
              users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) => handleUpdate(e, user.id, !user.active)}
                      value={user.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/users/edit/${user.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="action-btn"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <p className="text-center">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default UserWrapper;
