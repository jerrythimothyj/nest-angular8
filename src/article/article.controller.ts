import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './models/article.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
        async create(@Body() article: ArticleDto) {
        return this.articleService.create(article);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
        async findAll(): Promise<ArticleDto[]> {
        return this.articleService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
        async find(@Param('id') id: string) {
        return this.articleService.find(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
        async update(@Param('id') id: string, @Body() article: ArticleDto) {
        return this.articleService.update(id, article);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
        async delete(@Param('id') id: string) {
        return this.articleService.delete(id);
    }
}
