import { Injectable, Logger } from '@nestjs/common';

import { PagesRepository } from './pages.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  private readonly logger: Logger;

  constructor(private readonly pagesRepository: PagesRepository) {}

  async create(userId: string, uri: string, createPageDto: CreatePageDto) {
    try {
      return await this.pagesRepository.create({
        ...createPageDto,
        uri,
        userId,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(userId: string) {
    return this.pagesRepository.find({ userId });
  }

  async findOne(_id: string, userId: string) {
    return this.pagesRepository.findOne({ _id, userId });
  }

  async update(_id: string, userId: string, updatePageDto: UpdatePageDto) {
    return this.pagesRepository.findOneAndUpdate(
      { _id, userId },
      {
        $set: {
          ...updatePageDto,
        },
      },
    );
  }

  async remove(_id: string, userId: string) {
    return this.pagesRepository.findOneAndDelete({ _id, userId });
  }
}
