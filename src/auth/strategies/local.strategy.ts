import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { THESE_CREDENTIALS_DO_NOT_MATCH_OUR_RECORDS } from 'src/common/constants/error.messages';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(
        THESE_CREDENTIALS_DO_NOT_MATCH_OUR_RECORDS,
      );
    }
  }
}
