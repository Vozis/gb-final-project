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

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Auth()
  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @User('id') id: number,
    @Body() dto: CreateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<EventSelect> {
    return this.eventService.createEvent(id, dto, image);
  }

  @Auth()
  @Post(':eventId/toggle-user')
  async toggleUsers(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() toggleDto: ToggleDto,
  ): Promise<EventSelect> {
    return this.eventService.toggle(eventId, toggleDto);
  }

  @Get('all')
  @HttpCode(200)
  async getAllEvents(
    @Query() filterSearchDto?: FilterSearchDto,
  ): Promise<EventSelect[]> {
    return this.eventService.getAllEvents(filterSearchDto);
  }

  @Auth()
  @Get('')
  async getUserEvents(@User('id') id: number): Promise<EventSelect[]> {
    return this.eventService.getUserEvents(id);
  }

  @Auth()
  @Get('by-user-hobbies')
  async getByUserTags(@User('id') id: number): Promise<EventSelect[]> {
    return this.eventService.getByUserTags(id);
  }

  @Auth()
  @Delete(':eventId')
  async deleteEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventService.delete(eventId);
  }
}
