import {Controller, Post, Get, Body, Req,ForbiddenException, UnauthorizedException} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto, UpdateOrderDto, IdDto } from './dto/orders.dto';

@Controller('/api/admin/')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService,
  ) {}

  // Create Order (Owner/Admin)
  @Post('createOrder')
  async create(@Body() dto: CreateOrderDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (!['owner', 'admin'].includes(user.role)) throw new ForbiddenException('Not allowed');

    return this.ordersService.createOrder(dto);
  }

  // Get All Orders
  @Get('getAllOrders')
  async getAll(@Req() req: any) {
    this.verifyToken(this.extractToken(req));
    return this.ordersService.getAllOrders();
  }

  // Get Order by ID
  @Post('getOrderById')
  async getById(@Body() body: IdDto, @Req() req: any) {
    this.verifyToken(this.extractToken(req));
    return this.ordersService.getOrderById(body.id);
  }

  // Update Payment Status
  @Post('updateOrderPayment')
  async update(@Body() body: UpdateOrderDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (!['owner', 'admin'].includes(user.role)) throw new ForbiddenException('Not allowed');

    return this.ordersService.updateOrderPayment(body);
  }

  // Delete Order (Owner only)
  @Post('deleteOrderById')
  async delete(@Body() body: IdDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (user.role !== 'owner') throw new ForbiddenException('Only owner can delete');

    return this.ordersService.deleteOrder(body.id);
  }

  // Helper - Extract Token
  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return token;
  }

  // Helper - Verify Token
  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }


}
