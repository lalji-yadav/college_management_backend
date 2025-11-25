import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);

  console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

  console.log("student")
  await app.listen(3000);
}
bootstrap();
