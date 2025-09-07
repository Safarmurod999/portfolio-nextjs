"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { FaSave } from "react-icons/fa";
import useConnect from "./connect";
import { get } from "lodash";

const Page = () => {
  const { handleSubmit, handleChange, values, isLoading, error } = useConnect();

  return (
    <section className="user-edit h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Users Edit" backlink="/dashboard/users" />
        {!isLoading && (
          <Form direction="y" width="50" onSubmit={handleSubmit}>
            <div className="flex w-full gap-[10px]">
              <FormControl
                type="text"
                placeholder="John Doe"
                label={"Username"}
                name="username"
                onChange={handleChange}
                value={get(values, "username", "")}
                width="full"
              />
              <FormControl
                type="text"
                placeholder="*****"
                label={"Password"}
                name="password"
                onChange={handleChange}
                value={get(values, "password", "")}
                width="full"
              />
            </div>
            <FormBtn text="save" icon={<FaSave />} />
          </Form>
        )}
      </div>
    </section>
  );
};

export default Page;
