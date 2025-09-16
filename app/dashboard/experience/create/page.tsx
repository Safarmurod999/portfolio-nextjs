"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { IoAddSharp } from "react-icons/io5";
import useConnect from "./connect";

const Page = () => {
  const { handleSubmit, handleChange, values } = useConnect();
  return (
    <section className="experience-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Experience Create" backlink="/dashboard/experience" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Company"
              label={"Company"}
              onChange={handleChange}
              value={values.company}
              name="company"
              required={true}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="Role"
              label={"Role"}
              onChange={handleChange}
              value={values.jobTitle}
              name="jobTitle"
              required={true}
              width="full"
            />
          </div>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="date"
              placeholder="Date"
              label={"Date"}
              onChange={handleChange}
              value={values.date}
              name="date"
              required={true}
              width="full"
            />
          </div>
          <FormBtn text="add" icon={<IoAddSharp />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
