import styles from './update-event-main.module.scss';
import UpdateEventForm from './update-event-form/update-event-form';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICreateEvent, IOption } from '@project/shared/types';
import { EventService, TagService } from '@project/shared/services';
import { toast } from 'react-toastify';
import { errorCatch } from '@project/shared/utils';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface UpdateEventMainProps {}

export function UpdateEventMain(props: UpdateEventMainProps) {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className={styles['container']}>
      <UpdateEventForm eventId={id} />
    </div>
  );
}

export default UpdateEventMain;
