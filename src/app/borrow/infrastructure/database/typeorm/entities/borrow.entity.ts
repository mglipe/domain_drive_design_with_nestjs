import { BooksOrmEntity } from '../../../../../books/infrastructure/database/typeorm/entities/book.entity';
import { UsersOrmEntity } from '../../../../../users/infrastructure/database/typeorm/entitites/user-typeorm.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';



@Entity({name:'Borrow'})
@Index(["dueDate", "status"])
export class BorrowOrmEntity {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => UsersOrmEntity, (user) => user, { nullable: false, eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: UsersOrmEntity;

  @ManyToOne(() => BooksOrmEntity, (book) => book, { nullable: false, eager: true })
  @JoinColumn({ name: 'book_id' })
  book!: BooksOrmEntity;

  @Column({ type: 'timestamp' })
  borrowed_at!: Date;
  
  @Column({type: 'timestamp'})
  dueDate!: Date

  @Column({ type: 'timestamp', nullable: true })
  returned_at!: Date;

  @Column({ type: 'text'})
  status!: string;
}
