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
    <section className="education-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education Create" backlink="/dashboard/education" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="University"
              label={"Name"}
              onChange={handleChange}
              value={values.name}
              name="name"
              required={true}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="Tashkent"
              label={"Place"}
              onChange={handleChange}
              value={values.place}
              name="place"
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
