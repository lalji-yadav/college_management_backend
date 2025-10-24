import { Test, TestingModule } from '@nestjs/testing';
import { ReportsAnalyticsController } from './reports-analytics.controller';
import { ReportsAnalyticsService } from './reports-analytics.service';

describe('ReportsAnalyticsController', () => {
  let controller: ReportsAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsAnalyticsController],
      providers: [ReportsAnalyticsService],
    }).compile();

    controller = module.get<ReportsAnalyticsController>(ReportsAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
