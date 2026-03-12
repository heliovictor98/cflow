import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly defaultUser = { username: 'adm', password: 'adm' };

  login(dto: LoginDto): { token: string; username: string } {
    if (
      dto.username === this.defaultUser.username &&
      dto.password === this.defaultUser.password
    ) {
      return {
        token: 'cflow-token-adm',
        username: dto.username,
      };
    }
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }
}
