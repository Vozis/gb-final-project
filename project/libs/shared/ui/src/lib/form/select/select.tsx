import styles from './select.module.scss';

import { FC } from 'react';
import Select, { OnChangeValue } from 'react-select';
import { errorCatch } from '@project/shared/utils';
import makeAnimated from 'react-select/animated';
import { IOption, ISelect } from '@project/shared/types';

const animatedComponents = makeAnimated();

/* eslint-disable-next-line */
const SelectField: FC<ISelect> = ({
  field,
  isLoading,
  error,
  isMulti,
  options,
  placeholder,
}) => {
  const getValue = () => {
    if (field.value) {
      const item = isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);

      console.log(item);
      return item;
    } else {
      return isMulti ? [] : '';
    }
  };

  const onChange = (newValue: OnChangeValue<IOption, boolean> | unknown) => {
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map(option => option.value)
        : (newValue as IOption).value,
    );
  };

  return (
    <div className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <Select
          classNamePrefix={'custom-select'}
          options={options}
          isMulti={isMulti}
          components={animatedComponents}
          isLoading={isLoading}
          value={getValue()}
          onChange={onChange}
        />
      </label>
      {error && <div className={styles.error}>{errorCatch(error)}</div>}
    </div>
  );
};

export default SelectField;