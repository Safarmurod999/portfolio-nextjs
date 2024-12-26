import { useFetchData } from "@/app/hooks/useFetch";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import Pagination from "../Pagination/Pagination";
import { Form, FormBtn, FormControl } from "../Form/Form";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const UserWrapper = () => {
  const [username, setUsername] = useState("");

  const { data: users, isLoading, error } = useFetchData(`users`);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: number) => {
    dispatch(deleteData({ apiEndpoint: "users", id }));
  };
  const handleEdit = (data: User) => {
    const { id, username, password } = data;
    dispatch(updateData({ apiEndpoint: "users", newData: data, id }));
  };

  if (error) {
    console.log(error);
  }

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-stretch">
        <Form width="[300px]">
          <FormControl
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <FormBtn text="Search" />
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/users/create"}
            className="form-button flex items-center text-white"
          >
            <span>add</span>
            <IoAddSharp />
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Username</th>
              <th>Parol</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
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
            ) : isLoading ? (
              <tr>
                <td colSpan={4}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4}>
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
