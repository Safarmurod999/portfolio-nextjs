export {};
declare global {
  interface User {
    id: number;
    username: string;
    password: string;
  }

  interface FormProps {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    direction?: string;
    width?: string;
  }
  interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    label?: string | null;
    required: boolean;
    type: string;
    width?: string;
    disabled?: boolean;
  }
  interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    label: string | null;
    required: boolean;
    options: any;
    width?: string;
    disabled?: boolean;
  }
  interface BtnProps {
    text: string;
    icon?: React.ReactNode;
  }
  interface BreadcrumbProps {
    title: string;
    backlink?: string;
  }
}
