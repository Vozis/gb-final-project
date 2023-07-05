import { IFieldProps } from '@project/shared/types';
import { Options } from 'react-select';
import { ControllerRenderProps } from 'react-hook-form';

export interface IOption {
  value: number;
  label: string;
}

export interface ISelect extends IFieldProps {
  options: Options<IOption>;
  isMulti?: boolean;
  field: ControllerRenderProps<any, any>;
  isLoading?: boolean;
  onInputChange?: (value: any) => void;
  defaultValue?: number | number[];
}
