import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { LinksModule } from './pages/links/links.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    LinksModule,
    PagesModule,
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
