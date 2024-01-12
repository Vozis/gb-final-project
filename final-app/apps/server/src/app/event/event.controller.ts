import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { EventSelect } from './returnEventObject';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterSearchDto, IFilterDto } from './dto/search-event.dto';
import { ToggleDto } from '../../utils/toggle.dto';
import { EmailConfirmationGuard } from '../auth/guards/emailConfirmation.guard';
import { Cron } from '@nestjs/schedule';
import { CacheKey } from '@nestjs/cache-manager';
import { EnumCacheEventRoutes } from './constants';
import { HttpCacheInterceptor } from '../common/interceptors/httpCache.interceptor';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('checkEvent')
  async scheduleEventStatusManual() {
    return this.eventService.changeScheduleEventStatus();
  }

  // Public routes =============================================================
  @Get('public/all')
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(EnumCacheEventRoutes.GET_ALL_NO_USER_EVENTS)
  async getAllEventsNoUser(@Query() filterSearchDto?: FilterSearchDto) {
    // : Promise<EventSelect[]>
    return this.eventService.getAllEvents(undefined, filterSearchDto);
  }

  @Get('public/:id')
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(EnumCacheEventRoutes.GET_PUBLIC_EVENTS_BY_ID)
  async getByIdNoUser(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getById(id);
  }

  // User routes ===============================================================

  @Auth()
  // @Post('all')
  @Get('all')
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(EnumCacheEventRoutes.GET_ALL_EVENTS)
  async getAllEvents(
    @User('id') id: number,
    @Query()
    data?: IFilterDto,
    // @Body() filterSearchDto?: FilterSearchDto,
    @Query('withHobby') withHobby?: string,
    @Query('type') type?: string,
  ) {
    // console.log(withHobby);
    // : Promise<EventSelect[]>
    return this.eventService.getAllEvents(
      id,
      data.filterSearchDto,
      withHobby,
      type,
    );
  }
  @Auth()
  @Get('finished')
  async getFinishedEvents(@User('id') id: number) {
    return this.eventService.getFinishedEvents(id);
  }

  @Auth()
  @Get('by-user/:id')
  async getUserEvents(@User('id') id: number) {
    return this.eventService.getUserEvents(id);
  }

  // @Auth()
  // @Get('by-user-hobbies')
  // async getByUserTags(@User('id') id: number): Promise<EventSelect[]> {
  //   return this.eventService.getByUserTags(id);
  // }

  @Auth()
  @Get(':eventId')
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(EnumCacheEventRoutes.GET_EVENTS_BY_ID)
  async getById(
    @Param('eventId', ParseIntPipe) eventId: number,
    @User('id') id: number,
  ) {
    return this.eventService.getById(eventId, id);
  }

  @Auth()
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(EmailConfirmationGuard)
  async createEvent(
    @User('id') id: number,
    @Body() dto: CreateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<EventSelect> {
    return this.eventService.createEvent(id, dto, image);
  }

  @Auth()
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<EventSelect> {
    return this.eventService.updateEvent(id, dto, image);
  }

  @Auth()
  @Post(':eventId/toggle-user')
  async toggleUsers(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() toggleDto: ToggleDto,
  ) {
    return this.eventService.toggle(eventId, toggleDto);
  }

  @Auth()
  @Patch(':eventId')
  async cancelEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventService.cancelEvent(eventId);
  }

  @Auth()
  @Get('for-rating/:id')
  async getForRating(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getForRating(id);
  }

  // Admin routes ==============================================================

  @Auth()
  @Delete(':eventId')
  async deleteEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventService.delete(eventId);
  }

  @Cron('0 * * * *')
  async scheduleEventStatus() {
    return this.eventService.changeScheduleEventStatus();
  }

  // @Cron('57 23 * * *')
  // async scheduleEventStatus() {
  //   return this.eventService.changeScheduleEventStatus();
  // }
}
