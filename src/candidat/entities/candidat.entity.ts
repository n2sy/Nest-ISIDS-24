import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';

@Entity('candidat')
export class CandidatEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  prenom: string;

  @Column({
    length: 40,
  })
  nom: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column()
  profession: string;

  @Column()
  avatar: string;
}
