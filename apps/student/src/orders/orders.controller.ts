import {Controller,Post,Get,Body,Req,ForbiddenException,UnauthorizedException,} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Controller('/api/student/')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService,
  ) {}

  //  Create Order (Student)
  @Post('studentCreateOrder')
  async create(@Body() dto: CreateOrderDto, @Req() req: any) {
    const token = this.extractToken(req);
    const decoded = this.verifyToken(token);
    const studentId = decoded.id;

    return this.ordersService.createOrder(dto, studentId);
  }

  //  Get My Orders (Student)
  @Post('getOrdersByStudent')
  async getMyOrders(@Req() req: any) {
    const token = this.extractToken(req);
    const decoded = this.verifyToken(token);
    return this.ordersService.getOrdersByStudent(decoded.id);
  }

  //  Admin - Get All Orders
  // @Get('getAllOrders')
  // async getAll(@Req() req: any) {
  //   const token = this.extractToken(req);
  //   const decoded = this.verifyToken(token);

  //   if (!['owner', 'admin'].includes(decoded.role))
  //     throw new ForbiddenException('Not allowed');

  //   return this.ordersService.getAllOrders();
  // }

  //  Admin - Update Order Status
  // @Post('updateOrderStatus')
  // async update(@Body() dto: UpdateOrderStatusDto, @Req() req: any) {
  //   const token = this.extractToken(req);
  //   const decoded = this.verifyToken(token);

  //   if (!['owner', 'admin'].includes(decoded.role))
  //     throw new ForbiddenException('Not allowed');

  //   return this.ordersService.updateOrderStatus(dto);
  // }

  //  Helper Methods
  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return token;
  }

  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: 'laljiyadav' });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }


}
