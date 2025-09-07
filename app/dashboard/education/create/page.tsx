"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { addData } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Page = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = { name, date, place };
    dispatch(addData({ apiEndpoint: "education", newData }));
    // setName("");
  };
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
              onChange={(e) => setName(e.target.value)}
              value={name}
              required={true}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="Tashkent"
              label={"Place"}
              onChange={(e) => setPlace(e.target.value)}
              value={place}
              required={true}
              width="full"
            />
          </div>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="date"
              placeholder="Date"
              label={"Date"}
              onChange={(e) => setDate(e.target.value)}
              value={date}
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
