import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

type TypedInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypedInputPropsField {}
