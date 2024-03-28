import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@ApiTags('pages')
@ApiBearerAuth()
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: TokenPayload,
    @Body() createPageDto: CreatePageDto,
  ) {
    return this.pagesService.create(user._id, user.username, createPageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: TokenPayload) {
    return this.pagesService.findAll(user._id);
  }

  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser() user: TokenPayload, @Param('_id') _id: string) {
    return this.pagesService.findOne(_id, user._id);
  }

  @Patch(':_id')
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser() user: TokenPayload,
    @Param('_id') _id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pagesService.update(_id, user._id, updatePageDto);
  }

  @Delete(':_id')
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser() user: TokenPayload, @Param('_id') _id: string) {
    return this.pagesService.remove(_id, user._id);
  }
}
