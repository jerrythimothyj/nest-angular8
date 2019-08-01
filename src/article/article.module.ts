import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './article.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ArticleController],
    providers: [...articleProviders, ArticleService],
})
export class ArticleModule {}
