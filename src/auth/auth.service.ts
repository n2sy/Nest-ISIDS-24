import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async signup(credentials) {
    let newUser = this.userRepo.create({
      email: credentials.email,
      username: credentials.username,
      salt: await bcrypt.genSalt(),
      //role : roleEnum.ROLE_USER
    });
    let hashedPassword = await bcrypt.hash(credentials.password, newUser.salt);
    newUser.password = hashedPassword;
    return this.userRepo.save(newUser);
  }

  async signin(credentials) {
    const { identifiant, password } = credentials;
    const qb = this.userRepo.createQueryBuilder('user');
    const selectedUser = await qb
      .select('user')
      .where('user.email = :ident OR user.username = :ident')
      .setParameter('ident', identifiant)
      .getOne();
    if (!selectedUser)
      throw new NotFoundException('Username or email not existing');

    let result = await bcrypt.compare(password, selectedUser.password);
    if (!result) throw new NotFoundException('Wrong Password');
    else {
      return {
        id: selectedUser.id,
        role: selectedUser.role,
      };
    }
  }
}
