import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdatesDto, UpdateDailyDto, UpdateTodayDto } from './dto';
import { Request } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/Types';

@Controller('daily')
export class DailyUpdatesController {
  constructor(private DailyUpdateService: DailyUpdatesService) {}

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('today')
  createToday(@Body() dto: UpdateTodayDto) {
    const day = new Date();
    return this.DailyUpdateService.createDaily(dto, day);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('today/generate')
  generateToday() {
    const day = new Date();
    return this.DailyUpdateService.createDaily(undefined, day);
  }

  @Roles(Role.user, Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('today')
  getToday(@Req() request: Request) {
    console.log('user from controller' + JSON.stringify(request.user));
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Patch('today')
  updateToday(@Body() dto: UpdateTodayDto) {
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.updateDay(day, dto.prompt, dto.quote);
  }

  @Roles(Role.user, Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  getCertainDay(@Body() dto: DailyUpdatesDto) {
    const day = new Date(dto.date);
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Patch()
  updateDaily(@Body() dto: UpdateDailyDto) {
    const day = new Date(dto.date);
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.updateDay(day, dto.prompt, dto.quote);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createDaily(@Body() dto: UpdateDailyDto) {
    const day = new Date(dto.date);
    return this.DailyUpdateService.createDaily(dto, day);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/generate')
  generateCertainDay(@Body() dto: DailyUpdatesDto) {
    const day = new Date(dto.date);
    return this.DailyUpdateService.createDaily(undefined, day);
  }
}
