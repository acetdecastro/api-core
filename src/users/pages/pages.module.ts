import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PagesRepository } from './pages.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Page, PageSchema } from './entities/page.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Page.name,
        schema: PageSchema,
      },
    ]),
  ],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
