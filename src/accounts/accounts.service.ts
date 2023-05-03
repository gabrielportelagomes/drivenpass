import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(account: any, user: any) {
    const accountExists = await this.accountsRepository.findByTitleAndUserId(
      account.title,
      user.id,
    );

    if (accountExists) throw new ConflictException();

    const accountInfos = await this.accountsRepository.create({
      ...account,
      userId: user.id,
      user_password: this.cryptoService.encrypt(account.user_password),
    });

    delete accountInfos.user_password;

    return accountInfos;
  }

  async findManyByUserId(user: any) {
    const accounts = await this.accountsRepository.findManyByUserId(user.id);

    if (accounts.length === 0) throw new NotFoundException();

    accounts.forEach((account) => {
      account.user_password = this.cryptoService.decrypt(account.user_password);
    });

    return accounts;
  }

  async findById(id: number, user: any) {
    const account = await this.accountsRepository.findById(id);

    if (!account) throw new NotFoundException();

    if (account.userId !== user.id) throw new ForbiddenException();

    account.user_password = this.cryptoService.decrypt(account.user_password);

    return account;
  }

  async delete(id: number, user: any) {
    const account = await this.accountsRepository.findById(id);

    if (!account) throw new NotFoundException();

    if (account.userId !== user.id) throw new ForbiddenException();

    await this.accountsRepository.delete(id);
  }
}
