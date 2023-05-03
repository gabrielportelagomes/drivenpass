import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/encryption/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypt: BcryptService,
  ) {}

  create(user: any) {
    return this.prisma.user.create({
      data: {
        ...user,
        password: this.crypt.hash(user.password),
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
