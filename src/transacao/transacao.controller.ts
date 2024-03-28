import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
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

    @Get()
    async listAllTransacoes(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as UsuarioDto;

        const transacoes = await this.transacaoService.findAll(id);

        return res.status(HttpStatus.OK).json(transacoes);
    }
}
