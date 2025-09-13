"use client";
import React from "react";
import Pagination from "../../Dashboard/Pagination/Pagination";
import {
  Form,
  FormBtn,
  FormControl,
  FormSwitch,
} from "../../Dashboard/Form/Form";
import { MdDeleteOutline } from "react-icons/md";
import useConnect from "./connect";

const LeadsWrapper = () => {
  const {
    leads,
    isLoading,
    fullname,
    handleDelete,
    handleSearch,
    handleSubmit,
    handleUpdate,
    handleFilterReset
  } = useConnect();

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-stretch">
        <Form width="[300px]" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Fullname"
            value={fullname}
            name="fullname"
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
        </Form>
        <div className="flex"></div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Fullname</th>
              <th>Email</th>
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
            ) : leads ? (
              leads.map((lead: Lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.fullname}</td>
                  <td>{lead.email}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) => handleUpdate(e, lead.id, !lead.active)}
                      value={lead.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        onClick={() => handleDelete(lead.id)}
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

export default LeadsWrapper;
