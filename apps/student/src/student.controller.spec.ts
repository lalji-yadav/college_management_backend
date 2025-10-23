import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let studentController: StudentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    studentController = app.get<StudentController>(StudentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(studentController.getHello()).toBe('Hello World!');
    });
  });
});
