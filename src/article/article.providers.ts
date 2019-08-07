import { Connection } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleAddress } from './entities/article-address.entity';

export const articleProviders = [
    {
        provide: 'ARTICLE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Article),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ARTICLE_ADDRESS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ArticleAddress),
        inject: ['DATABASE_CONNECTION'],
    },
];
