import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: any) {
    const userInfos = await this.usersRepository.create(user);

    delete userInfos.password;

    return userInfos;
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }
}
