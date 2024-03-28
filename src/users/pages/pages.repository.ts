import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesRepository extends AbstractRepository<Page> {
  protected readonly logger = new Logger(PagesRepository.name);

  constructor(@InjectModel(Page.name) PageModel: Model<Page>) {
    super(PageModel);
  }
}
