import { Test, TestingModule } from '@nestjs/testing';
import { StudentControlService } from './student-control.service';

describe('StudentControlService', () => {
  let service: StudentControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentControlService],
    }).compile();

    service = module.get<StudentControlService>(StudentControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
