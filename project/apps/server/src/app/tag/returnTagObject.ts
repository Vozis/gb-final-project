import { Prisma } from '@prisma/client';
import { returnEventObject } from '../event/returnEventObject';

export const returnTagObject: Prisma.TagSelect = {
  id: true,
  name: true,
  shortName: true,
  type: true,
  events: {
    select: returnEventObject,
  },
};

export const returnTagFullObject: Prisma.TagSelect = {
  id: true,
  name: true,
  shortName: true,
  type: true,
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
