import styles from './upload-field.module.scss';
import React, {
  ChangeEvent,
  forwardRef,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { IField } from '@project/shared/types';
import { errorCatch } from '@project/shared/utils';
import { AiOutlineUpload } from 'react-icons/ai';
import cn from 'clsx';
import { MaterialIcon } from '../../icons/material-icon';

/* eslint-disable-next-line */
export interface UploadFieldProps {}

export const UploadField = forwardRef<HTMLInputElement, IField>(
  (
    {
      result,
      setResult,
      setIsNewImageAdd,
      resetField,
      isLoaded,
      setIsLoaded,
      visibility,
      placeholder,
      error,
      style,
      onChange,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selectedName, setSelectedName] = useState('');
    const imageRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files[0]) return;
      const imageFile = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('loadstart', () => {
        console.log('load start');
        setIsLoading(true);
      });

      reader.addEventListener('loadend', () => {
        // console.log('load end');
        if (setIsLoaded) {
          setIsLoaded(true);
        }
        setIsLoading(false);
      });

      reader.addEventListener('load', e => {
        // console.log('load');
        if (!e.target) return;
        if (setResult) {
          setResult(e.target.result);
        }
      });

      reader.readAsDataURL(imageFile);
    };

    return (
      <div className={cn(styles.app, className)}>
        <div className={styles.parent}>
          <div className={styles.file_upload}>
            <div className={styles.file_upload_img}>
              <AiOutlineUpload className={'text-[50px]'} />
            </div>
            <h4 className={styles.file_upload_h3}>
              {' '}
              {selectedName || 'Кликните что бы загрузить'}
            </h4>
            <p>Максимальный размер 10mb</p>
            <input
              type={'file'}
              ref={ref}
              {...rest}
              // @ts-ignore
              onChange={event => {
                if (setIsNewImageAdd) {
                  setIsNewImageAdd(true);
                }
                handleFileChange(event);
              }}
            />
            {isLoading && <p>Идет загрузка...</p>}
            {/*{isLoaded && (*/}
            {/*  <p className={'text-white text-lg'}>Загрузка завершена!</p>*/}
            {/*)}*/}
            {result && (
              <img
                ref={imageRef}
                // @ts-ignore
                src={result}
                alt={'Аватар'}
                style={{
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                  padding: '10px',
                  borderRadius: '30px',
                }}
              />
            )}
          </div>
        </div>
        <button
          className={'absolute -top-1 -right-1 p-2'}
          type={'button'}
          onClick={() => {
            console.log('reset image');
            if (resetField) {
              resetField('avatar');
            }
            if (setResult) {
              setResult('');
            }
          }}
        >
          <MaterialIcon name={'MdOutlineCancel'} className={'text-3xl'} />
        </button>
        {error && <div className={styles.error}>{errorCatch(error)}</div>}
      </div>
    );
  },
);

UploadField.displayName = 'UploadField';
