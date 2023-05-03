import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cryptr = require('cryptr');

@Injectable()
export class CryptoService {
  cryptr = new Cryptr(process.env.CRYPTR_SECRET);

  encrypt(rawPassword: string): string {
    return this.cryptr.encrypt(rawPassword);
  }

  decrypt(encryptedPassword: string): string {
    return this.cryptr.decrypt(encryptedPassword);
  }
}
