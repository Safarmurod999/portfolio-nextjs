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
import { Experience } from "@/app/types/store/experience";

const ExperienceWrapper = () => {
  const {
    experience,
    isLoading,
    handleDelete,
    handleSearch,
    company,
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
            placeholder="Company"
            value={company}
            name="company"
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/experience/create"}
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
            ) : experience ? (
              experience.map((experience: Experience) => (
                <tr key={experience.id}>
                  <td>{experience.id}</td>
                  <td>{experience.company}</td>
                  <td>{experience.jobTitle}</td>
                  <td>{experience.date}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, experience.id, !experience.active)
                      }
                      value={experience.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/experience/edit/${experience.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(experience.id)}
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

export default ExperienceWrapper;
