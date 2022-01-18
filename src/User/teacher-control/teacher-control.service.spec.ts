import { Test, TestingModule } from '@nestjs/testing';
import { TeacherControlService } from './teacher-control.service';

describe('TeacherControlService', () => {
  let service: TeacherControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherControlService],
    }).compile();

    service = module.get<TeacherControlService>(TeacherControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
