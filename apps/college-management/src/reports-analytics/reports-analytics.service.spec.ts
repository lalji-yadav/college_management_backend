import { Test, TestingModule } from '@nestjs/testing';
import { ReportsAnalyticsService } from './reports-analytics.service';

describe('ReportsAnalyticsService', () => {
  let service: ReportsAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsAnalyticsService],
    }).compile();

    service = module.get<ReportsAnalyticsService>(ReportsAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
