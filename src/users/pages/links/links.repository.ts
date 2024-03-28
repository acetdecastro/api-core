import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksRepository extends AbstractRepository<Link> {
  protected readonly logger = new Logger(LinksRepository.name);

  constructor(@InjectModel(Link.name) LinkModel: Model<Link>) {
    super(LinkModel);
  }
}
