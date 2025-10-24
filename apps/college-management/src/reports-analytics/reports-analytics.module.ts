import { Module } from '@nestjs/common';
import { ReportsAnalyticsService } from './reports-analytics.service';
import { ReportsAnalyticsController } from './reports-analytics.controller';

@Module({
  controllers: [ReportsAnalyticsController],
  providers: [ReportsAnalyticsService],
})
export class ReportsAnalyticsModule {}
