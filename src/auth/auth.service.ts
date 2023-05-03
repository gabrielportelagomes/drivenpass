import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/encryption/bcrypt.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'DrivenPass';
  private AUDIENCE = 'users';

  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: AuthSignInDTO) {
    const userExists = await this.usersService.getByEmail(user.email);

    if (!userExists) {
      throw new NotFoundException();
    }

    const valid = await this.bcryptService.compare(
      userExists.password,
      user.password,
    );

    if (!valid) {
      throw new UnauthorizedException();
    }

    return this.createToken(userExists);
  }

  async createToken(user: User) {
    const token = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return {
      accessToken: token,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}
