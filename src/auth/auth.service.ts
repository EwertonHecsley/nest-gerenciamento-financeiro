import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, senha: string): Promise<UsuarioDto> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('Email não encontrado.');

        const verifyPassword = await bcrypt.compare(senha, user.senha);
        if (!verifyPassword) throw new UnauthorizedException('Senha inválida.');

        return user;
    }

    async getToken(user: UsuarioDto): Promise<string> {
        const payload = { id: user.id, email: user.email };

        return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
    }
}
