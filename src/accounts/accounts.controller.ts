import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { AuthGuard } from 'src/guard/guard.guard';
import { User } from 'src/decorators/users.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async postAccount(@User() user, @Body() body: CreateAccountDTO) {
    return this.accountsService.create(body, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@User() user) {
    return this.accountsService.findManyByUserId(user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getAccount(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findById(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAccount(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.delete(id, user);
  }
}
