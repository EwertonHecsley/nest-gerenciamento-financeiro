import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { Request, Response } from 'express';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';

@UseGuards(JwtAuthGuard)
@Controller('categoria')
export class CategoriaController {
    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    @Get()
    async getCategorias(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const categorias = await this.categoriaService.findAll(id);

        return res.status(HttpStatus.OK).json(categorias);
    }
}
