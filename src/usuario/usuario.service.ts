import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(dataUser: UsuarioDto): Promise<UsuarioDto> {
        const { nome, email, senha } = dataUser;

        const buscaEmail = await this.prisma.usuario.findUnique({ where: { email } });
        if (buscaEmail) throw new HttpException('E-mail já utilizado em outro usuário.', HttpStatus.BAD_REQUEST);

        const hashSenha = await bcrypt.hash(senha, 10);

        return await this.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashSenha
            }
        })
    }
}
