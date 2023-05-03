import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [PrismaModule, EncryptionModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
