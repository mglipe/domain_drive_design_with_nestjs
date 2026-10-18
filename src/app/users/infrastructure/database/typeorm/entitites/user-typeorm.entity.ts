import { BorrowOrmEntity } from '@/app/borrow/infrastructure/database/typeorm/entities/borrow.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({name:'User'})
export class UsersOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'text' })
  firstname!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  cpf!: string;

  @Column({ type: 'text' })
  matricula!: string;

  @Column({ type: 'timestamp' })
  create_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  update_at!: Date;
}
