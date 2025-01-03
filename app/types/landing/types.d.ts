import { StaticImageData } from "next/image";

export {};

declare global {


  interface ElementProps {
    id: number;
    time: string;
    title: string;
    data: string;
  }

  interface DetailsWrapperProps {
    array: ElementProps[];
    title: string;
  }

  interface ServiceCardProps {
    id: number;
    title: string;
    description: string;
  }
  interface ServiceWrapperProps {
    array: ServiceCardProps[];
  }
  interface DetailsCardProps {
    id: number;
    data: string;
    time: string;
    title: string;
  }

  interface ProjectCardProps {
    id: number;
    image: string;
    title: string;
    url: string;
    data: string;
  }
  interface ProjectInnerProps {
    id: number;

    image: StaticImageData;

    title: string;

    data: string;

    url: string;
  }
  interface ProjectWrapperProps {
    array: ProjectInnerProps[];
    type: string;
  }
}
