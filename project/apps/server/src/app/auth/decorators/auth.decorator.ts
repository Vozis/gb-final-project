import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../guards/auth.guard';

export const Auth = (role: Role = 'USER') =>
  applyDecorators(
    role === 'ADMIN' ? UseGuards(JwtAuthGuard) : UseGuards(JwtAuthGuard),
  );
