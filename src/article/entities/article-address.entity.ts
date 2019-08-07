import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address1: string;

  @Column('text')
  address2: string;
}
