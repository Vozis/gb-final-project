import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { Role, User as UserModel } from '@prisma/client';
import { ToggleDto } from '../../utils/toggle.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Users

  @Auth()
  @Get('profile')
  async getProfile(@User('id') id: number) {
    return this.userService.getById(id);
  }

  @Auth()
  @Put('profile')
  updateProfile(@User('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Admins

  @Auth('ADMIN')
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  // @Get('profile/favorites')
  // @Auth()
  // async getFavorites(@User('id') id: number) {
  //   return this.userService.getAll();
  // }

  @Put('profile/toggle')
  @Auth()
  async toggleHobbies(@User('id') id: number, @Body() toggleDto: ToggleDto) {
    return this.userService.toggle(id, toggleDto);
  }
}
