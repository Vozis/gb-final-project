import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { ToggleDto } from '../../utils/toggle.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  // Public routes =============================================================

  constructor(private readonly userService: UserService) {}

  @Get('public/:id')
  async getByIdNoUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  // User routes ===============================================================

  @Put('profile/reset-password')
  async resetPassword(@Body() dto: { id: number; data: UpdateUserDto }) {
    return this.userService.update(dto.id, dto.data);
  }

  @Auth()
  @Get('profile')
  async getProfile(@User('id') id: number) {
    return this.userService.getById(id, id);
  }

  @Get('all')
  async getBySearch(@Query('searchTerm') searchTerm?: string) {
    return await this.userService.getAll(searchTerm);
  }

  @Auth()
  @Get(':userId')
  async getById(
    @User('id') id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.getById(userId, id);
  }

  @Auth()
  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    // @Param('id', ParseIntPipe) id: number,
    @User('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.update(id, updateUserDto, avatar);
  }

  @Auth()
  @Put('profile/toggle')
  async toggle(@User('id') id: number, @Body() toggleDto: ToggleDto) {
    return this.userService.toggle(id, toggleDto);
  }

  // Admin routes ===============================================================

  @Auth('ADMIN')
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfileAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.update(id, updateUserDto, avatar);
  }

  @Auth('ADMIN')
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
