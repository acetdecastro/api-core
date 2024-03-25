import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/token-payload.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async login(@CurrentUser() user: TokenPayload) {
    return await this.usersService.findAll();
  }

  @Get('/get-me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
