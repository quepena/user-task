import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  public readonly password: string;

  @IsString()
  public readonly username: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly photo: string;
}

export class LoginDto {
  @IsString()
  public readonly password: string;

  @IsString()
  public readonly email: string;
}

export class TokenDto {
  @IsString()
  public readonly token: string;
}