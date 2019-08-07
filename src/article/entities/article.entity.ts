import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleAddress } from './article-address.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column({ type: 'text', default: null })
  articleAddressId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
