import { Prisma } from '@prisma/client';
import { returnEventObject } from '../event/returnEventObject';
import { returnTypeTagObject } from '../type-tag/returnTypeTagObject';

export const returnTagObject: Prisma.TagSelect = {
  id: true,
  name: true,
  shortName: true,
  type: {
    select: returnTypeTagObject,
  },
};

export const returnTagFullObject: Prisma.TagSelect = {
  id: true,
  name: true,
  shortName: true,
  type: {
    select: returnTypeTagObject,
  },
  events: {
    select: returnEventObject,
  },
};

export type TagSelect = Prisma.TagGetPayload<{
  select: typeof returnTagObject;
}>;

export type TagFullSelect = Prisma.TagGetPayload<{
  select: typeof returnTagFullObject;
}>;
