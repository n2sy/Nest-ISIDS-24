import { TimeStamp } from 'src/candidat/generics/timestamp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { roleEnum } from './generics/roleEnum';

@Entity('user')
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  email: string;

  @Column({
    length: 20,
  })
  username: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: roleEnum,
    default: roleEnum.ROLE_USER,
  })
  role;
}
