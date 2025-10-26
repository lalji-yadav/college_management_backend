import {Controller,Post,Get,Body,Req,UnauthorizedException,ForbiddenException} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtService } from '@nestjs/jwt';
import { CreateSubjectDto, UpdateSubjectDto, IdDto } from './dto/subject.dto';

@Controller('/api/admin/')
export class SubjectsController {
  constructor(
    private readonly subjectService: SubjectsService,
    private readonly jwtService: JwtService,
  ) {}

  //  Create Subject (only owner/admin)
  @Post('createSubject')
  async create(@Body() dto: CreateSubjectDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to create subjects');
    }

    return this.subjectService.createSubject(dto);
    
  }

  //  Get All Subjects
  @Get('getAllSubjects')
  async findAll(@Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token); // just verify token
    return this.subjectService.getAllSubjects();
  }

  //  Get Subject by ID
  @Post('getSubjectById')
  async getById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    this.verifyToken(token);
    return this.subjectService.getSubjectById(body.id);
  }

  //  Update Subject by ID (only owner/admin)
  @Post('updateSubjectById')
  async updateById(@Body() body: UpdateSubjectDto & IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (!['owner', 'admin'].includes(user.role)) {
      throw new ForbiddenException('You are not allowed to update subjects');
    }

    const { id, ...updateData } = body;
    return this.subjectService.updateSubject(id, updateData);
  }

  //  Delete Subject (only owner)
  @Post('deleteSubjectById')
  async deleteById(@Body() body: IdDto, @Req() req: any) {
    const token = this.extractToken(req);
    const user = this.verifyToken(token);

    if (user.role !== 'owner') {
      throw new ForbiddenException('Only owner can delete subjects');
    }

    return this.subjectService.deleteSubject(body.id);
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
      return this.jwtService.verify(token, { secret: 'laljiyadav' }); // TODO: move to env
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
