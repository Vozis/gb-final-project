import { Prisma } from '@prisma/client';

export const returnTypeTagObject: Prisma.TypeTagSelect = {
  id: true,
  name: true,
};

export type TypeTag = Prisma.TypeTagGetPayload<{
  select: typeof returnTypeTagObject;
}>;
