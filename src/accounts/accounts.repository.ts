import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/encryption/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypt: BcryptService,
  ) {}

  findByTitleAndUserId(title: string, userId: number) {
    return this.prisma.accounts.findFirst({
      where: {
        AND: [{ title }, { userId }],
      },
    });
  }

  create(account: any) {
    return this.prisma.accounts.create({
      data: account,
    });
  }

  findManyByUserId(userId: number) {
    return this.prisma.accounts.findMany({
      where: {
        userId,
      },
    });
  }

  findById(id: number) {
    return this.prisma.accounts.findUnique({
      where: {
        id,
      },
    });
  }

  delete(id: number) {
    return this.prisma.accounts.delete({
      where: {
        id,
      },
    });
  }
}
