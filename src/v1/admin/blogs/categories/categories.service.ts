import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { Category, CategoryDocument } from '../../../mongoose/schemas';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: PaginateModel<CategoryDocument>,
  ) {}

  /**
   * store category
   * @param createCategoryDto: CreateCategoryDto
   * @returns Promise<Category>
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create({
      ...createCategoryDto,
    });
  }

  /**
   * get all categorys with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Category>>>
   */
  async findAllWithPagination(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Category>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [{ title: regexSearchTerm }];
    }

    return await this.categoryModel.paginate(query, paginationQuery);
  }

  /**
   * get all categorys with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Category>>>
   */
  async findAll(searchTerm: string) {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [{ title: regexSearchTerm }];
    }

    return await this.categoryModel.find(query);
  }

  /**
   * get single category
   * @param id: string
   * @returns Promise<Category>
   */
  async findOne(id: string): Promise<Category> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update category by id
   * @param id: string
   * @param updateCategoryDto: UpdateCategoryDto
   * @returns Promise<Category>
   */
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.updateCategory(id, { ...updateCategoryDto });
  }

  /**
   * remove category by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.categoryModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove category by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.categoryModel.deleteMany({ _id: ids });
  }

  /**
   * find category by id or throw exceptation
   * @param id: string
   * @returns Promise<Category>
   */
  private async findByIdOrFail(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('category not found');

    return category;
  }

  /**
   * find category by id or throw exceptation then update category
   * @param id: string
   * @param data: any
   * @returns Promise<Category>
   */
  private async updateCategory(id: string, data: any): Promise<Category> {
    await this.findByIdOrFail(id);
    const updated = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
