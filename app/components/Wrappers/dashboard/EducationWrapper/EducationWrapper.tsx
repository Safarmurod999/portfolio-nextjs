"use client";
import React from "react";
import Pagination from "@/app/components/Dashboard/Pagination/Pagination";
import {
  Form,
  FormBtn,
  FormControl,
  FormSwitch,
} from "@/app/components/Dashboard/Form/Form";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import useConnect from "./connect";

const EducationWrapper = () => {
  const {
    education,
    isLoading,
    handleDelete,
    handleSearch,
    name,
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
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/education/create"}
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
              <th>Name</th>
              <th>Place</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : education ? (
              education.map((education: Education) => (
                <tr key={education.id}>
                  <td>{education.id}</td>
                  <td>{education.name}</td>
                  <td>{education.place}</td>
                  <td>{education.date}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, education.id, !education.active)
                      }
                      value={education.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/education/edit/${education.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(education.id)}
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
                <td colSpan={6}>
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

export default EducationWrapper;
