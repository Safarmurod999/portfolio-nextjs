"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
  FormSelect,
} from "@/app/components/Dashboard/Form/Form";
import { IoAddSharp } from "react-icons/io5";
import useConnect from "./connect";

const Page = () => {
  const { handleSubmit, handleChange, values, servicesList } = useConnect();

  return (
    <section className="project-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb
          title="Service Detail Edit"
          backlink="/dashboard/service-details"
        />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Landing page"
              label={"Name"}
              onChange={handleChange}
              value={values.name}
              name="name"
              required={true}
              width="full"
            />
            <FormSelect
              placeholder="Select service"
              label={"Service"}
              onChange={handleChange}
              value={values.service_id && values.service_id.toString()}
              options={servicesList ? servicesList : []}
              name="service_id"
              required={true}
              width="full"
            />
          </div>
          <FormBtn text="save" icon={<IoAddSharp />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
