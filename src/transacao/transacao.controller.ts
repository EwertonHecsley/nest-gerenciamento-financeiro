import { Controller, Get, HttpException, HttpStatus, Param, Req, Res, UseGuards } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { Request, Response } from 'express';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';

@UseGuards(JwtAuthGuard)
@Controller('transacao')
export class TransacaoController {
    constructor(
        private readonly transacaoService: TransacaoService
    ) { }

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
