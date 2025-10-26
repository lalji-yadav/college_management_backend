import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { JwtModule } from '@nestjs/jwt'
import { Student,StudentSchema,Order,OrderSchema,Course,CourseSchema } from '@app/common';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    JwtModule.register({ secret: 'laljiyadav', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}


