import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { Request, Response } from 'express';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';
import { CategoriaDto } from './dto/categoria.dto';

@UseGuards(JwtAuthGuard)
@Controller('categoria')
export class CategoriaController {
    constructor(
        private readonly categoriaService: CategoriaService
    ) { }

    @Post()
    async create(@Body() dataCategoria: CategoriaDto, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;
        const { descricao } = dataCategoria;

        const categoria = await this.categoriaService.create(id, descricao);

        return res.status(HttpStatus.CREATED).json(categoria);
    }

    @Put(':id')
    async updateCategoria(@Param('id') categoria_id: string, @Body() dataCategoria: CategoriaDto, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;
        const { descricao } = dataCategoria;

        await this.categoriaService.update(id, parseInt(categoria_id), descricao);

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Delete(':id')
    async deleteCategoria(@Param('id') categoria_id: string, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        await this.categoriaService.deleteCategory(id, parseInt(categoria_id));

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get(':id')
    async detailCategoria(@Param('id') param_id: string, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const result = await this.categoriaService.detail(id, parseInt(param_id));
        if (!result) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        const { transacao: _, ...categoria } = result;

        return res.status(HttpStatus.OK).json(categoria);
    }

    @Get()
    async getCategorias(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const categorias = await this.categoriaService.findAll(id);

        return res.status(HttpStatus.OK).json(categorias);
    }
}
