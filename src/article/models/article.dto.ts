import { ArticleAddressDto } from '../models/article-address.dto';

export class ArticleDto {
  id: number;

  title: string;

  author: string;

  description: string;

  content: string;

  articleAddress: ArticleAddressDto;

}
