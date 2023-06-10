import { Prisma } from "@prisma/client";
import {returnEventObject} from "../event/returnEventObject";

export const returnTypeTagObject: Prisma.TypeTag = {
  id: true,
  name: true,
};

export type TypeTag = Prisma.GetPayload<{
  select: typeof returnEventObject;
}>;
