"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { updateData } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Page = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateData({
        apiEndpoint: "categories",
        newData: { name },
        id: +id,
      })
    );
    setName("");
  };

  return (
    <section className="category-edit h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Categories Edit" backlink="/dashboard/categories" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Frontend"
              label={"Name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              width="full"
            />
          </div>
          <FormBtn text="save" icon={<FaSave />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
