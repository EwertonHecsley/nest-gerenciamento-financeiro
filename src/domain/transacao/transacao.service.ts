import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TransacaoDto } from './dto/transacao.dto';

@Injectable()
export class TransacaoService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll(user_id: number): Promise<TransacaoDto[]> {
        return await this.prismaService.transacao.findMany({ where: { usuario_id: user_id } });
    }

    async detailTransacao(user_id: number, transacao_id: number): Promise<any> {
        return await this.prismaService.transacao.findFirst({ where: { usuario_id: user_id, id: transacao_id } });
    }

    async create(user_id: number, dataTransacao: TransacaoDto): Promise<TransacaoDto> {
        const { descricao, valor, categoria_id, data_transacao, tipo } = dataTransacao;

        const categoria = await this.prismaService.categoria.findFirst({ where: { id: categoria_id, usuario_id: user_id } });
        if (!categoria) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        return await this.prismaService.transacao.create({ data: { descricao, valor, data_transacao, tipo, categoria_id, usuario_id: user_id } });
    }

    async update(user_id: number, dataTransacao: TransacaoDto): Promise<TransacaoDto> {
        const { descricao, valor, categoria_id, data_transacao, tipo } = dataTransacao;

        const categoria = await this.prismaService.categoria.findFirst({ where: { id: categoria_id, usuario_id: user_id } });
        if (!categoria) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        return await this.prismaService.transacao.update({
            data: { descricao, valor, data_transacao, tipo, categoria_id, usuario_id: user_id },
            where: { usuario_id: user_id, id: dataTransacao.id }
        });
    }
}
