import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import {
  EMAIL_ALREADY_TAKEN,
  CREDENTIALS_ARE_INVALID,
  USERNAME_ALREADY_TAKEN,
} from 'src/common/constants/error.messages';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(private readonly usersRepository: UsersRepository) {}

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.create({
        ...createUserDto,
        password: await this.hashPassword(createUserDto.password),
      });
    } catch (error) {
      if (
        error.message.includes('E11000') &&
        error.message.includes('email_1')
      ) {
        throw new UnprocessableEntityException(EMAIL_ALREADY_TAKEN);
      }

      if (
        error.message.includes('E11000') &&
        error.message.includes('username_1')
      ) {
        throw new UnprocessableEntityException(USERNAME_ALREADY_TAKEN);
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    return this.usersRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserDto,
        },
      },
    );
  }

  async remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException(CREDENTIALS_ARE_INVALID);
    }
    return user;
  }
}
