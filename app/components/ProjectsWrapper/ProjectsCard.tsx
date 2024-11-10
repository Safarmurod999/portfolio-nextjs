import { ProjectCardProps } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectsCard = ({ id, image, title, url, data }: ProjectCardProps) => {
  return (
    <li key={id} className="projects-item">
      <Image
        src={image}
        loading="lazy"
        alt={"project image"}
        width={200}
        height={150}
      />
      <div className="projects-data">
        <h3>{title}</h3>
        <Link href={`/portfolio/${id}`} aria-label="page" className="flex items-center gap-[5px] group">
          <span className="group-hover:mr-[5px] duration-200">{data}</span>
          <FaArrowRightLong className="duration-200"/>
        </Link>
      </div>
    </li>
  );
};

export default ProjectsCard;
