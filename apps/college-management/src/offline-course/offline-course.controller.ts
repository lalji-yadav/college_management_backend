import {Controller,Post,Get,Body,Req,UnauthorizedException,ForbiddenException} from '@nestjs/common';
import { OfflineCourseService } from './offline-course.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOfflineCourseDto, UpdateOfflineCourseDto } from './dto/create-offline-course.dto';


class IdDto {
  id: string;
}

@Controller('/api/admin/')
export class OfflineCourseController {
  constructor(
    private readonly offlineCourseService: OfflineCourseService,
    private readonly jwtService: JwtService,
  ) {}

  //  Create Offline Course (Only for owner or admin)
  @Post('createOfflineCourse')
  async create(@Body() dto: CreateOfflineCourseDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to create offline courses');
    }

    return this.offlineCourseService.createCourse(dto);
  }

  //  Get All Offline Courses
  @Get('getAllOfflineCourses')
  async findAll(@Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token); // just verify

    return this.offlineCourseService.getAllCourses();
  }

  //  Get Course by ID
  @Post('getOfflineCourseById')
  async getById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token);

    return this.offlineCourseService.getCourseById(body.id);
  }

  //  Update by ID (Only for owner/admin)
  @Post('updateOfflineCourseById')
  async updateById(@Body() body: UpdateOfflineCourseDto & IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to update offline courses');
    }

    const { id, ...updateData } = body;
    return this.offlineCourseService.updateCourse(id, updateData);
  }

  //  Delete by ID (Only for owner)
  @Post('deleteOfflineCourseById')
  async deleteById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (user.role !== 'owner') {
      throw new ForbiddenException('Only owner can delete offline courses');
    }

    return this.offlineCourseService.deleteCourse(body.id);
  }

  //  Helper — Extract Token
  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return token;
  }

  // Helper — Verify Token
  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
