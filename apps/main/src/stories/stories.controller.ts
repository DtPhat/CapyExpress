import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Sort } from '../types/global.types';
import { FilterStoriesDto } from './dto/filter-stories.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("title") title: string = '',
    @Query("category") category: string = "",
    @Query("level") level: string = "",
    @Query("sortBy") sortBy: string = "_id",
    @Query("direction") direction: "asc" | "desc" = "asc"
  ) {
    const filterDto: FilterStoriesDto = {
      title,
      category,
      level,
    }

    const sort: Sort = {
      field: sortBy,
      direction: direction
    }

    return this.storiesService.findAll(page, size, sort, filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(+id);
  }
}
