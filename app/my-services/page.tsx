import { Metadata } from "next";
import Link from "next/link";
import { Footer, Header, ServiceWrapper, Title } from "../components";
import { services } from "../const/data";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Services",
  description:
    "There are full informations about my services. You can find out what I can do for you.",
};
const Services = () => {
  return (
    <>
      <Header />
      <section className="service__top">
        <div className="container">
          <Title>All Services</Title>
          <Link href={"/"} aria-label="home" className="service__subtitle">
            Home / <span>Services</span>
          </Link>
        </div>
      </section>
      <section className="service">
        <div className="container">
          <ServiceWrapper array={services} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
