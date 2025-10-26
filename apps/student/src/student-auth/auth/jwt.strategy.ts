import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header se token read karega
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // payload me id, email, role hoga
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
