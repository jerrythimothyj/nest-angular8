import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import * as R from 'ramda'
import { ArticleDto } from './models/article.dto';

@Injectable()
export class ArticleService {

  async create(article: ArticleDto): Promise<ArticleDto> {
    const entityManager = getManager();

    // tslint:disable-next-line:max-line-length
    const addressQueryResult = await entityManager.query(`insert into article_address(address1, address2) values('${article.articleAddress.address1}', '${article.articleAddress.address2}')`);

    // tslint:disable-next-line:max-line-length
    const articleQueryResult = await entityManager.query(`insert into article(title, author, description, content, articleAddressId) values('${article.title}', '${article.author}', '${article.description}', '${article.content}', '${addressQueryResult.insertId}')`);

    return {
      ...article,
      id: articleQueryResult.insertId,
      articleAddress: {
        ...article.articleAddress,
        id: addressQueryResult.insertId,
      },
    };
  }

  async findAll(): Promise<ArticleDto[]> {
    const entityManager = getManager();
    // tslint:disable-next-line:max-line-length
    const queryResult = await entityManager.query(`select a.id, a.title, a.author, a.description, a.content, a.updatedAt, aa.id as addressId, aa.address1, aa.address2 from article as a left join article_address as aa on a.articleAddressId=aa.id`);

    const receivedArticles: ArticleDto[] = R.map((record) => {
      let receivedArticle = new ArticleDto();
      receivedArticle = R.pipe(
        R.pick(['id', 'title', 'author', 'description', 'content', 'updatedAt']),
        R.assoc('articleAddress', {
          id: record.addressId,
          address1: record.address1,
          address2: record.address2,
        }))(record);

      return receivedArticle;
    }, queryResult);

    return receivedArticles;
  }

  async find(id: string): Promise<ArticleDto> {
    const entityManager = getManager();
    // tslint:disable-next-line:max-line-length
    const queryResult = await entityManager.query(`select a.id, a.title, a.author, a.description, a.content, a.updatedAt, aa.id as addressId, aa.address1, aa.address2 from article as a left join article_address as aa on a.articleAddressId=aa.id where a.id=${id}`);

    let receivedArticle = new ArticleDto();
    receivedArticle = R.pipe(
      R.pick(['id', 'title', 'author', 'description', 'content', 'updatedAt']),
      R.assoc('articleAddress', {
        id: queryResult[0].addressId,
        address1: queryResult[0].address1,
        address2: queryResult[0].address2,
      }))(queryResult[0]);

    return receivedArticle;
  }

  async update(id: string, article: ArticleDto): Promise<ArticleDto> {
    const entityManager = getManager();
    // tslint:disable-next-line:max-line-length
    const addressQueryResult = await entityManager.query(`update article_address set address1='${article.articleAddress.address1}', address2='${article.articleAddress.address2}' where id='${article.articleAddress.id}'`);
    // tslint:disable-next-line:max-line-length
    const articleQueryResult = await entityManager.query(`update article set title='${article.title}', author='${article.author}', description='${article.description}', content='${article.content}' where id='${id}'`);

    return article;
  }

  async delete(id: string): Promise<boolean> {
    const entityManager = getManager();
    // tslint:disable-next-line:max-line-length
    const queryResult = await entityManager.query(`select a.id, aa.id as addressId from article as a left join article_address as aa on a.articleAddressId=aa.id where a.id=${id}`);

    // tslint:disable-next-line:max-line-length
    if (queryResult[0].addressId) {
      const addressQueryResult = await entityManager.query(`delete from article_address where id='${queryResult[0].addressId}'`);
    }
    // tslint:disable-next-line:max-line-length
    const articleQueryResult = await entityManager.query(`delete from article where id='${id}'`);

    return true;
  }
}
