import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { LinksRepository } from './links.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Link, LinkSchema } from './entities/link.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Link.name,
        schema: LinkSchema,
      },
    ]),
    LinksModule,
  ],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
})
export class LinksModule {}
