import { Test, TestingModule } from '@nestjs/testing';
import { TeacherControlController } from './teacher-control.controller';

describe('TeacherControlController', () => {
  let controller: TeacherControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherControlController],
    }).compile();

    controller = module.get<TeacherControlController>(TeacherControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
