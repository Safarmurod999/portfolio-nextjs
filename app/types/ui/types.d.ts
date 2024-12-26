export {};
declare global {
  interface SpinnerProps {
    className?: string;
    position?: "center" | "start" | "end" | "full" | "absolute";
    md?: boolean;
  }

  interface TypographyProps {
    children: string;
    maxWidth?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  }

  interface PrimaryBtnProps {
    text: string;
    link: string;
    ariaLabel: string;
  }

  interface SecondaryBtnProps {
    link: string;
    text: string;
  }

  interface DropdownProps {
    array: { name: string; link: string }[];
    open: boolean;
  }

  interface CircleProps {
    text: string;
    link: string;
    id: string;
  }
}
