import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'article_address'})
export class ArticleAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address1: string;

  @Column('text')
  address2: string;
}
