import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Post()
    async create(@Body() dataUser: UsuarioDto, @Res() res: Response) {
        const resultado = await this.usuarioService.create(dataUser);
        const { senha: _, ...usuario } = resultado;

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario });
    }
}
