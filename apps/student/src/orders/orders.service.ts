import { Injectable, BadRequestException, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { Course, Order, Student } from '@app/common';



@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) { }

  //  Create Order
  async createOrder(dto: CreateOrderDto, studentId: string) {

    console.log("CreateOrderDto studentId ", CreateOrderDto, studentId)

    if (!Types.ObjectId.isValid(studentId))
      throw new BadRequestException('Invalid student ID');

    const student = await this.studentModel.findById(studentId);
    if (!student) throw new NotFoundException('Student not found');

    if (!Types.ObjectId.isValid(dto.courseId))
      throw new BadRequestException('Invalid Course ID');

    const course = await this.courseModel.findById(dto.courseId);
    if (!course) throw new NotFoundException('Course not found');

    const order = new this.orderModel({
      ...dto,
      studentId: new Types.ObjectId(studentId),
      courseId: new Types.ObjectId(dto.courseId),
      purchasedAt: new Date(),
      validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year validity
    });

    const saved = await order.save();

    //  If payment success → Add course to student
    if (dto.paymentStatus === 'success') {
      if (!student.purchasedCourses.includes(dto.courseId as any)) {
        student.purchasedCourses.push(dto.courseId as any);
        await student.save();
      }
    }

    return saved;
  }

  //  Get All Orders (admin/owner)
  //   async getAllOrders() {
  //     return this.orderModel
  //       .find()
  //       .populate('studentId', 'name email')
  //       .populate('courseId', 'title price')
  //       .sort({ createdAt: -1 });
  //   }

  //  Get Orders by Student
  async getOrdersByStudent(studentId: string) {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Invalid student ID');
    }
    const orderData = await this.orderModel
      .find({ studentId: new Types.ObjectId(studentId) }) // Convert to ObjectId
      .populate('courseId', 'title price')
      .sort({ createdAt: -1 })
      .exec();

    console.log("order data", orderData);
    return orderData;
  }

  //  Update Order Status (admin/owner)
  //   async updateOrderStatus(dto: UpdateOrderStatusDto) {
  //     const order = await this.orderModel.findById(dto.id);
  //     if (!order) throw new NotFoundException('Order not found');

  //     order.paymentStatus = dto.paymentStatus;
  //     await order.save();

  //     // Add purchased course if success
  //     if (dto.paymentStatus === 'success') {
  //       const student = await this.studentModel.findById(order.studentId);
  //       if (student && !student.purchasedCourses.includes(order.courseId)
  //       ) {
  //         student.purchasedCourses.push(order.courseId);
  //         await student.save();
  //       }
  //     }

  //     return order;
  //   }

}

