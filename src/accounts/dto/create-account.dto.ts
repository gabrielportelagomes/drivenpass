import { IsString, IsUrl } from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  title: string;
  @IsUrl()
  account_url: string;
  @IsString()
  user_credential: string;
  @IsString()
  user_password: string;
}
