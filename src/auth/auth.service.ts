import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const tokenPayload: TokenPayload = {
      ...user,
      _id: user._id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload);

    return {
      ...user,
      id: user._id.toString(),
      token,
    };
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
