import { Controller } from '@nestjs/common';
import { ReportsAnalyticsService } from './reports-analytics.service';

@Controller('reports-analytics')
export class ReportsAnalyticsController {
  constructor(private readonly reportsAnalyticsService: ReportsAnalyticsService) {}
}
