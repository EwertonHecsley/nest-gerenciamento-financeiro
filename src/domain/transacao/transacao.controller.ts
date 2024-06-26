import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { Request, Response } from 'express';
import { UsuarioDto } from 'src/domain/usuario/dto/usuario.dto';
import { TransacaoDto } from './dto/transacao.dto';

@UseGuards(JwtAuthGuard)
@Controller('transacao')
export class TransacaoController {
    constructor(
        private readonly transacaoService: TransacaoService
    ) { }

    @Post()
    async create(@Body() dataTransacao: TransacaoDto, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const transacao = await this.transacaoService.create(id, dataTransacao);

        return res.status(HttpStatus.CREATED).json(transacao);
    }

    @Put(':id')
    async update(@Body() dataTransacao: TransacaoDto, @Param('id') transacao_id: string, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        await this.transacaoService.update(id, dataTransacao, parseInt(transacao_id));

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Delete(':id')
    async deleteTransacao(@Param('id') transacao_id: string, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        await this.transacaoService.deleteTransacao(id, parseInt(transacao_id));

        return res.status(HttpStatus.NO_CONTENT).send();
    }

    @Get('/extrato')
    async extrato(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const extrato = await this.transacaoService.extrato(id);

        return res.status(HttpStatus.OK).json(extrato);
    }

    @Get(':id')
    async detalharTransacao(@Param('id') transacao_id: string, @Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const transacao = await this.transacaoService.detailTransacao(id, parseInt(transacao_id));
        if (!transacao) throw new HttpException('Transacao nao encontrada.', HttpStatus.NOT_FOUND);

        return res.status(HttpStatus.OK).json(transacao);
    }

    @Get()
    async listAllTransacoes(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const transacoes = await this.transacaoService.findAll(id);

        return res.status(HttpStatus.OK).json(transacoes);
    }
}
