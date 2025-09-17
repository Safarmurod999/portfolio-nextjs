"use client";

import React, { useState } from "react";

import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaGithubAlt, FaLinkedinIn } from "react-icons/fa6";

import TopTitle from "../../ui/TopTitle/TopTitle";
import Title from "../../ui/Title/Title";

import earth from "../../../assets/icons/earth.svg";
import email from "../../../assets/icons/email.svg";
import bell from "../../../assets/icons/bell.svg";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";

import { toast } from "sonner";
import { useFormik } from "formik";
import { addLeadData } from "@/app/store/slices/leadsSlice";

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState({
    fullname: "",
    email: "",
    message: "",
  });
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const handleSend = (values) => {
    dispatch(addLeadData(values)).then((res) => {
      if (res.type === "data/addLeadData/fulfilled") {
        toast.success("Message sent successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/addLeadData/rejected") {
        toast.error("Error sending message", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      message: "",
    },
    onSubmit: handleSend,
    enableReinitialize: true,
  });
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer__data">
          <TopTitle>CONTACT ME</TopTitle>
          <Title>Lets Discuss Your Project</Title>
          <ul className="footer__list">
            <li className="footer__list--item">
              <div>
                <Image src={earth} alt="bell" />
              </div>
              <div>
                <p>Phone</p>
                <h6>+998 50 705 09 04</h6>
              </div>
            </li>
            <li className="footer__list--item">
              <div>
                <Image src={email} alt="email" />
              </div>
              <div>
                <p>Email</p>
                <h6>safarmurodurinov@gmail.com</h6>
              </div>
            </li>
            <li className="footer__list--item">
              <div>
                <Image src={bell} alt="bell" />
              </div>
              <div>
                <p>Location</p>
                <h6>Tashkent city,Uzbekistan</h6>
              </div>
            </li>
          </ul>
          <ul className="footer__links">
            <li>
              <a
                href="https://t.me/UrinovSafarmurod"
                target="blank"
                aria-label="Telegram"
              >
                <FaTelegramPlane />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/safarmurodurinov"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="https://www.github.com/Safarmurod999"
                aria-label="Github"
              >
                <FaGithubAlt />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/safarmurod0904"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/safarmurod999/"
                aria-label="Linkedin"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__contact">
          <form className="footer__form" onSubmit={handleSubmit}>
            <div className="footer__form--title">Fill The Form</div>
            <input
              type="text"
              className="footer__form--input"
              placeholder="Your Full Name"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              className="footer__form--input"
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="You message"
            ></textarea>
            <button className="footer__btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <span>&copy;</span> 2024 S.Urinov All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
