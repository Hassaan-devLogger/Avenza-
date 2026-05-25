import {
  Body, Controller, Get, Param, Patch, Post, Request, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly appsService: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req) {
    return this.appsService.create(dto, req.user.sub);
  }

  @Get()
  findMine(@Request() req) {
    return this.appsService.findAllForUser(req.user.sub);
  }

  @Get('stats')
  getStats() {
    return this.appsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.appsService.findOne(id, req.user.sub);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.appsService.updateStatus(id, dto.status, dto.adminNote);
  }
}
