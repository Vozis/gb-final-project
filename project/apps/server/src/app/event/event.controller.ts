import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  UseGuards,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { EventSelect } from './returnEventObject';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterSearchDto } from './dto/search-event.dto';
import { ToggleDto } from '../../utils/toggle.dto';
import { EmailConfirmationGuard } from '../auth/guards/emailConfirmation.guard';
import { Cron } from '@nestjs/schedule';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Public routes =============================================================
  @Get('public/all')
  @HttpCode(200)
  async getAllEventsNoUser(@Query() filterSearchDto?: FilterSearchDto) {
    // : Promise<EventSelect[]>
    return this.eventService.getAllEvents(undefined, filterSearchDto);
  }

  @Get('public/:id')
  async getByIdNoUser(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.getById(id);
  }

  // User routes ===============================================================

  @Auth()
  @Post('all')
  // @Get('all')
  @HttpCode(200)
  async getAllEvents(
    @User('id') id: number,
    // @Query() filterSearchDto?: FilterSearchDto,
    @Body() filterSearchDto?: FilterSearchDto,
    @Query('withHobby') withHobby?: string,
  ) {
    // : Promise<EventSelect[]>
    return this.eventService.getAllEvents(id, filterSearchDto, withHobby);
  }
  @Auth()
  @Get('finished')
  async getFinishedEvents(@User('id') id: number) {
    return this.eventService.getFinishedEvents(id);
  }

  // @Auth()
  // @Get('my-events')
  // async getUserEvents(@User('id') id: number): Promise<EventSelect[]> {
  //   return this.eventService.getUserEvents(id);
  // }

  // @Auth()
  // @Get('by-user-hobbies')
  // async getByUserTags(@User('id') id: number): Promise<EventSelect[]> {
  //   return this.eventService.getByUserTags(id);
  // }

  @Auth()
  @Get(':eventId')
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

  // Admin routes ==============================================================

  @Auth()
  @Delete(':eventId')
  async deleteEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventService.delete(eventId);
  }

  @Cron('0 * * * * *')
  async scheduleEventStatus() {
    return this.eventService.changeScheduleEventStatus();
  }
}
