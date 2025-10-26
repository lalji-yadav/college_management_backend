import {Controller, Post, Get, Body, Req,UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { JwtService } from '@nestjs/jwt';
import { CreateContentDto, UpdateContentDto, IdDto } from './dto/contents.dto';

@Controller('/api/admin/')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly jwtService: JwtService,
  ) {}

  //  Create Content (Owner/Admin only)
  @Post('createContent')
  async create(@Body() dto: CreateContentDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (!['owner', 'admin'].includes(user.role))
      throw new ForbiddenException('You are not allowed to create content');

    return this.contentsService.createContent(dto);
    
  }

  //  Get All Contents
  @Get('getAllContents')
  async getAll(@Req() req: any) {
    this.verifyToken(this.extractToken(req)); // Just verify
    return this.contentsService.getAllContents();
  }

  //  Get by ID
  @Post('getContentById')
  async getById(@Body() body: IdDto, @Req() req: any) {
    this.verifyToken(this.extractToken(req));
    return this.contentsService.getContentById(body.id);
  }

  //  Update (Owner/Admin only)
  @Post('updateContentById')
  async update(@Body() body: UpdateContentDto & IdDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (!['owner', 'admin'].includes(user.role))
      throw new ForbiddenException('You are not allowed to update content');

    const { id, ...updateData } = body;
    return this.contentsService.updateContent(id, updateData);
  }

  //  Delete (Owner only)
  @Post('deleteContentById')
  async delete(@Body() body: IdDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (user.role !== 'owner')
      throw new ForbiddenException('Only owner can delete content');

    return this.contentsService.deleteContent(body.id);
  }

  //  Helper - Extract Token
  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return token;
  }

  //  Helper - Verify Token
  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: 'laljiyadav' }); // store in env ideally
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }


}

