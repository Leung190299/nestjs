import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 100,
  })
  userName: string;
  @Column()
  password: string;
  @Column()
  fullName: string;
  @Column()
  dateOfBirth: string;
  @Column({
    length: 10,
  })
  phone: string;
  @Column({ length: 100 })
  email: string;
}
