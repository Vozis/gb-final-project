import {Prisma} from "@prisma/client";

export type ReturnRating = Prisma.RatingSelect & { isParticipate: boolean };
export const returnRatingObject: ReturnRating =  {
  userId: true,
  eventId: true,
  rating: true,
};
