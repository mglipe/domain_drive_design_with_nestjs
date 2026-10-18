import { BorrowOrmEntity } from '@/app/borrow/infrastructure/database/typeorm/entities/borrow.entity';
import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({name: 'Book'})
export class BooksOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  author!: string;

  @Column({ type: 'text'})
  code!: string;

  @Column({ type: 'int'})
  inventory!: number

  @Column({type: 'timestamp'})
  create_at!: Date;

  @Column({type: 'timestamp', nullable: true})
  update_at!: Date;

}
