import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';


@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
        async create(@Body() article: Article) {
        return this.articleService.create(article);
    }

    @Get()
        async findAll(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Get(':id')
        async find(@Param('id') id: string) {
        return this.articleService.find(id);
    }

    @Put(':id')
        async update(@Param('id') id: string, @Body() article: Article) {
        return this.articleService.update(id, article);
    }

    @Delete(':id')
        async delete(@Param('id') id: string, @Body() article: Article) {
        return this.articleService.delete(id, article);
    }
}
