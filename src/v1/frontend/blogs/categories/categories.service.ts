import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../../../mongoose/schemas';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  /**
   * get all categories with pagination
   * @returns Promise<Category[]>
   */
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  /**
   * get single category
   * @param id: string
   * @returns Promise<Category>
   */
  async findOne(slug: string) {
    const category = await this.categoryModel.findOne({ slug });

    if (!category) throw new NotFoundException('category not found');

    return category;
  }
}
