import { Connection } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleAddressEntity } from './entities/article-address.entity';

export const articleProviders = [
    {
        provide: 'ARTICLE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ArticleEntity),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ARTICLE_ADDRESS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ArticleAddressEntity),
        inject: ['DATABASE_CONNECTION'],
    },
];
