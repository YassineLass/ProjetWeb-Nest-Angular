import { Test, TestingModule } from '@nestjs/testing';
import { StudentControlController } from './student-control.controller';

describe('StudentControlController', () => {
  let controller: StudentControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentControlController],
    }).compile();

    controller = module.get<StudentControlController>(StudentControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
