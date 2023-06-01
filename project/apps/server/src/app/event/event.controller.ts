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
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { EventSelect } from './returnEventObject';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Body('id', ParseIntPipe) id: number,
  ): Promise<EventSelect> {
    return this.eventService.toggle(eventId, { type: 'users', toggleId: id });
  }

  @Get('all')
  async getAllEvents(
    @Query('searchTerm') searchTerm?: string,
  ): Promise<EventSelect[]> {
    return this.eventService.getAllEvents(searchTerm);
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
