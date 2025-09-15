export {};
declare global {
  interface Education {
    id: number;
    name: string;
    date: string;
    place: string;
    active: boolean;
  }

  interface Lead {
    id: number;
    fullname: string;
    email: string;
    active: boolean;
  }

  interface User {
    id: number;
    username: string;
    password: string;
    active: boolean;
  }
  interface Category {
    id: number;
    name: string;
    active: boolean;
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
    required?: boolean;
    type: string;
    width?: string;
    disabled?: boolean;
    name?: string;
  }
  interface SelectProps {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    label: string | null;
    required: boolean;
    options: any[];
    width?: string;
    disabled?: boolean;
    name?: string;
  }
  interface OptionProps {
    label: string;
    value: string | number;
  }

  interface MultiSelectProps {
    label?: string;
    placeholder?: string;
    options: OptionProps[];
    value: string[] | number[];
    onChange: (val: (string | number)[]) => void;
    width?: string;
  }
  interface OptionProps {
    value: string | number;
    label: string;
  }

  interface BtnProps {
    text: string;
    icon?: React.ReactNode;
  }
  interface SwitchProps {
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  interface BreadcrumbProps {
    title: string;
    backlink?: string;
  }
}
