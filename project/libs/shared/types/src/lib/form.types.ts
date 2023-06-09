import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  visibility?: boolean;
}

type TypedInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypedInputPropsField {}

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}
