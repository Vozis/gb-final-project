import styles from './upload-field.module.scss';
import { forwardRef, useState } from 'react';
import { IField } from '@project/shared/types';
import { errorCatch } from '@project/shared/utils';
import { AiOutlineUpload } from 'react-icons/ai';

/* eslint-disable-next-line */
export interface UploadFieldProps {}

export const UploadField = forwardRef<HTMLInputElement, IField>(
  (
    { visibility, placeholder, error, style, onChange, children, ...rest },
    ref,
  ) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState('');

    return (
      <div className={styles.app}>
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
              // onChange={handleFileChange}
            />
          </div>
        </div>
        {error && <div className={styles.error}>{errorCatch(error)}</div>}
      </div>
    );
  },
);

UploadField.displayName = 'UploadField';
