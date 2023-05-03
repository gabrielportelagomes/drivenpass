import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AccountsRepository } from './accounts.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    EncryptionModule,
    CryptoModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
