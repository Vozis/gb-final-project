import React, { FC } from 'react';
import * as BiIcons from 'react-icons/bi';
import { TypedBeIconName } from '@project/shared/types';

export const BiIcon: FC<
  {
    name: TypedBeIconName;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ name, className }) => {
  const IconComponent = BiIcons[name];

  return <IconComponent className={className} /> || <BiIcons.BiError />;
};
