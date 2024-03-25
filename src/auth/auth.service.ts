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
      _id: user._id.toHexString(),
      email: user.email,
      name: user?.name || undefined,
    };

    const token = this.jwtService.sign(tokenPayload);

    const _user = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name || undefined,
      token,
    };

    return _user;
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
