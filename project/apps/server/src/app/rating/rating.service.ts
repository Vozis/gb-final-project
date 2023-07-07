import {Inject, Injectable} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import {PRISMA_INJECTION_TOKEN} from "../prisma/prisma.module";
import {PrismaService} from "../prisma/prisma.service";
import {returnRatingObject} from "./dto/return-rating.dto";
import {EventEmitter2} from "@nestjs/event-emitter";
import {MailerService} from "@nestjs-modules/mailer";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RatingService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}
  create(createRatingDto: CreateRatingDto) {
    const newRating = await this.prisma.rating.create({
      data: {
        userId: createRatingDto.userId,
        eventId: createRatingDto.eventId,
        rating: createRatingDto.rating
      },
      select: returnRatingObject,
    });

    return newRating;
  }
}
