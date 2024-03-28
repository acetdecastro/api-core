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
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@ApiTags('links')
@ApiBearerAuth()
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: TokenPayload,
    @Body() createLinkDto: CreateLinkDto,
  ) {
    return this.linksService.create(user._id, createLinkDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: TokenPayload) {
    return this.linksService.findAll(user._id);
  }

  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser() user: TokenPayload, @Param('_id') _id: string) {
    return this.linksService.findOne(_id, user._id);
  }

  @Patch(':_id')
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser() user: TokenPayload,
    @Param('_id') _id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linksService.update(_id, user._id, updateLinkDto);
  }

  @Delete(':_id')
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser() user: TokenPayload, @Param('_id') _id: string) {
    return this.linksService.remove(_id, user._id);
  }
}
