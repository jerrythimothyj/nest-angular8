import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleAddress } from './entities/article-address.entity';

@Injectable()
export class ArticleService {
  entityManager: any;
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: Repository<Article>,
    @Inject('ARTICLE_ADDRESS_REPOSITORY')
    private readonly articleAddressRepository: Repository<ArticleAddress>,
  ) {

  }

  async create(articleDto: Article): Promise<Article> {
    const createdArticle = new Article();
    createdArticle.title = articleDto.title;
    createdArticle.author = articleDto.author;
    createdArticle.description = articleDto.description;
    createdArticle.content = articleDto.content;

    const newAddress = {
      address1: 'My address 1',
      address2: 'My address 2',
    };

    const savedAddress = await this.articleAddressRepository.save(newAddress);
    createdArticle.articleAddressId = savedAddress.id;

    return await this.articleRepository.save(createdArticle);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async find(id: string): Promise<Article> {
    const entityManager = getManager();
    return await entityManager.query(`SELECT * FROM article WHERE id = ${id}`);
  }

  async update(id: string, articleDto: Article): Promise<Article> {
    const updateArticle = await this.articleRepository.findOne(id);
    updateArticle.title = articleDto.title;
    updateArticle.author = articleDto.author;
    updateArticle.description = articleDto.description;
    updateArticle.content = articleDto.content;

    return await this.articleRepository.save(updateArticle);
  }

  async delete(id: string, articleDto: Article): Promise<Article> {
    const articleToRemove = await this.articleRepository.findOne(id);
    return await this.articleRepository.remove(articleToRemove);
  }
}
