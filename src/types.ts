export enum Label {
  NAME = "Name",
  EMAIL = "Email",
  SUBJECT = "Subject",
  MESSAGE = "Message",
}

export enum Placeholder {
  NAME = "Type your name...",
  EMAIL = "Type your email adress...",
  SUBJECT = "Type a subject...",
  MESSAGE = "Type message here...",
}

export enum Status {
  FILLING_FORM = "fillingForm",
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface FormField {
  value: string;
  errors: string[];
  settings: FormFieldSettings;
}

export interface FormFieldSettings {
  type: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export interface IputProps {
  formSettings: FormFieldSettings;
  modelValue: string;
  isSubmitted: boolean;
  errors: string[];
}
