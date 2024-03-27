import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

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

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() userData: UsuarioDto, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        await this.usuarioService.updateUser(userData, id);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Req() req: Request, @Res() res: Response): Promise<Object> {
        const { id } = req.user as UsuarioDto;

        const result = await this.usuarioService.findUserById(id);
        const { senha: _, ...usuario } = result;

        return res.status(HttpStatus.OK).json(usuario);
    }
}
