"use client";
import React from "react";
import Link from "next/link";
import {
  Form,
  FormBtn,
  FormControl,
  FormSwitch,
} from "@/app/components/Dashboard/Form/Form";
import Pagination from "@/app/components/Dashboard/Pagination/Pagination";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useConnect from "./connect";

const UserWrapper = () => {
  const {
    users,
    isLoading,
    handleDelete,
    handleSearch,
    username,
    handleSubmit,
    handleUpdate,
    handleFilterReset,
  } = useConnect();

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
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
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
              <th>Password</th>
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
