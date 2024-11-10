export interface SpinnerProps {
  className?: string;
  position?: "center" | "start" | "end" | "full" | "absolute";
  md?: boolean;
}

export interface TypographyProps {
  children: string;
  maxWidth?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
}

export interface PrimaryBtnProps {
  text: string;
  link: string;
  ariaLabel: string;
}

export interface SecondaryBtnProps {
  link: string;
  text: string;
}

export interface DropdownProps {
  array: { name: string; link: string }[];
  open: boolean;
}

export interface CircleProps {
  text: string;
  link: string;
  id: string;
}

export interface ElementProps {
  id: number;
  time: string;
  title: string;
  data: string;
}

export interface DetailsWrapperProps {
  array: ElementProps[];
  title: string;
}

export interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
}

export interface DetailsCardProps {
  id: number;
  data: string;
  time: string;
  title: string;
}

export interface ProjectCardProps {
  id: number;
  image: string;
  title: string;
  url: string;
  data: string;
}
