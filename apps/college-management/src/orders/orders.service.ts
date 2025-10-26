import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from './dto/orders.dto';
import { Order,Student,Course } from '@app/common';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  //  Create Order
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    if (!Types.ObjectId.isValid(dto.studentId) || !Types.ObjectId.isValid(dto.courseId)) {
      throw new BadRequestException('Invalid studentId or courseId');
    }

    const student = await this.studentModel.findById(dto.studentId);
    if (!student) throw new NotFoundException('Student not found');

    const course = await this.courseModel.findById(dto.courseId);
    if (!course) throw new NotFoundException('Course not found');

    const order = new this.orderModel({
      ...dto,
      studentId: new Types.ObjectId(dto.studentId),
      courseId: new Types.ObjectId(dto.courseId),
    });

    const savedOrder = await order.save();

    //  If payment is success, add course to student.purchasedCourses
    if (dto.paymentStatus === 'success') {
      student.purchasedCourses = student.purchasedCourses || [];
      if (!student.purchasedCourses.includes(dto.courseId as any)) {
        student.purchasedCourses.push(dto.courseId as any);
        await student.save();
      }
    }

    return savedOrder;
  }

  //  Get All Orders
  async getAllOrders(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('studentId', 'name email')
      .populate('courseId', 'name')
      .sort({ purchasedAt: -1 });
  }

  //  Get Order by ID
  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id)
      .populate('studentId', 'name email')
      .populate('courseId', 'name');
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  //  Update Order Payment Status
  async updateOrderPayment(dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findById(dto.id);
    if (!order) throw new NotFoundException('Order not found');

    order.paymentStatus = dto.paymentStatus;
    await order.save();

    //  If payment changed to success, add course to student
    if (dto.paymentStatus === 'success') {
      const student = await this.studentModel.findById(order.studentId);
      if (student) {
        student.purchasedCourses = student.purchasedCourses || [];
        if (!student.purchasedCourses.includes(order.courseId)) {
          student.purchasedCourses.push(order.courseId);
          await student.save();
        }
      }
    }

    return order;
  }

  // Delete Order
  async deleteOrder(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Order not found');
    return { message: 'Order deleted successfully' };
  }


}


