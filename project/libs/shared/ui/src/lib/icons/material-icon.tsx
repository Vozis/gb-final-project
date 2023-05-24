import React, { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';
import { TypedMaterialIconName } from '@project/shared/types';

const MaterialIcon: FC<
  {
    name: TypedMaterialIconName;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ name, className }) => {
  const IconComponent = MaterialIcons[name];

  return <IconComponent className={className} /> || <MaterialIcons.MdError />;
};

export default MaterialIcon;
