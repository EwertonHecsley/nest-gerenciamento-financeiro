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

    async update(user_id: number, dataTransacao: TransacaoDto, transacao_id: number): Promise<TransacaoDto> {
        const { descricao, valor, categoria_id, data_transacao, tipo } = dataTransacao;

        const transacao = await this.prismaService.transacao.findUnique({ where: { usuario_id: user_id, id: transacao_id } });
        if (!transacao) throw new HttpException('Transação não encontrada.', HttpStatus.NOT_FOUND);

        const categoria = await this.prismaService.categoria.findFirst({ where: { id: categoria_id, usuario_id: user_id } });
        if (!categoria) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        return await this.prismaService.transacao.update({
            data: { descricao, valor, data_transacao, tipo, categoria_id },
            where: { usuario_id: user_id, id: transacao_id }
        });
    }

    async deleteTransacao(user_id: number, transacao_id: number): Promise<TransacaoDto> {
        const transacao = await this.prismaService.transacao.findFirst({ where: { usuario_id: user_id, id: transacao_id } });
        if (!transacao) throw new HttpException('Transacao não encontrada.', HttpStatus.NOT_FOUND);

        return await this.prismaService.transacao.delete({ where: { usuario_id: user_id, id: transacao_id } });
    }

    async extrato(user_id: number) {
        const entradas = (await this.prismaService.transacao.findMany({ where: { usuario_id: user_id, tipo: 'entrada' } }))
            .reduce((acc, element) => acc + element.valor, 0);

        const saidas = (await this.prismaService.transacao.findMany({ where: { usuario_id: user_id, tipo: 'saida' } }))
            .reduce((acc, element) => acc + element.valor, 0);

        return {
            entradas,
            saidas
        }
    }
}
