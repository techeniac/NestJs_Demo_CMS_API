import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TagsModule, CategoriesModule, PostsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BlogsModule {}
