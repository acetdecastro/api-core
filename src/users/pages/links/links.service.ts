import { Injectable, Logger } from '@nestjs/common';

import { LinksRepository } from './links.repository';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinksService {
  private readonly logger: Logger;

  constructor(private readonly linksRepository: LinksRepository) {}

  async create(userId: string, createLinkDto: CreateLinkDto) {
    try {
      return await this.linksRepository.create({
        ...createLinkDto,
        userId,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    return this.linksRepository.find({ userId });
  }

  async findOne(_id: string, userId: string) {
    return this.linksRepository.findOne({ _id, userId });
  }

  async update(_id: string, userId: string, updateLinkDto: UpdateLinkDto) {
    return this.linksRepository.findOneAndUpdate(
      { _id, userId },
      {
        $set: {
          ...updateLinkDto,
        },
      },
    );
  }

  async remove(_id: string, userId: string) {
    return this.linksRepository.findOneAndDelete({ _id, userId });
  }
}
