import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReportsService } from '../services/reports.service';
import { ReportResultDto } from '../dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Report')
@UseInterceptors(CacheInterceptor)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('/')
  @ApiOkResponse({
    description: 'Get report about all lessons',
    type: ReportResultDto,
  })
  async getReport(): Promise<ReportResultDto> {
    return this.reportsService.getReport();
  }
}
