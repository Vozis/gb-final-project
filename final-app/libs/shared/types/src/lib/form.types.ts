import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormResetField,
} from 'react-hook-form';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { IUserUpdateForm } from './user.types';
import { IRegister } from './auth.types';

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  visibility?: boolean;
  resetField?: UseFormResetField<any>;
  setIsNewImageAdd?: Dispatch<SetStateAction<boolean>>;
  setResult?: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  result?: string | ArrayBuffer | null;
  isLoaded?: boolean;
  setIsLoaded?: Dispatch<SetStateAction<boolean>>;
}

type TypedInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypedInputPropsField {}

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}
