import { Controller, Post, Get, Body, Req, UnauthorizedException, ForbiddenException, } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, IdDto } from './dto/create-course.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/admin/')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtService: JwtService,
  ) { }

  // Create Course (Only for owner or admin)
  @Post('createCourses')
  async create(@Body() dto: CreateCourseDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to create a course');
    }

    return this.courseService.createCourse(dto);
  }

  // Get All Courses
  @Get('getAllCourses')
  async findAll(@Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token); // just verify, no role check
    
    return this.courseService.getAllCourses();
  }

  // Get by ID
  @Post('get-by-id')
  async getById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token);
    return this.courseService.getCourseById(body.id);
  }

  // Update by ID (Only for owner/admin)
  @Post('update-by-id')
  async updateById(@Body() body: UpdateCourseDto & IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to update courses');
    }

    const { id, ...updateData } = body;
    return this.courseService.updateCourse(id, updateData);
  }

  // Delete by ID (Only for owner)
  @Post('delete-by-id')
  async deleteById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (user.role !== 'owner') {
      throw new ForbiddenException('Only owner can delete courses');
    }

    return this.courseService.deleteCourse(body.id);
  }

  //  Helper — Extract Token
  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return token;
  }

  //  Helper — Verify Token
  private verifyToken(token: string): any {
    try {

      console.log("token------>", token)

      return this.jwtService.verify(token, { secret: 'laljiyadav' });  // store this in env
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

}


