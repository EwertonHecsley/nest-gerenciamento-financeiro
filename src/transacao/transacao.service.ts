import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class TransacaoService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll(user_id: number): Promise<any[]> {
        return await this.prismaService.transacao.findMany({ where: { usuario_id: user_id } });
    }

    async detailTransacao(user_id: number, transacao_id: number): Promise<any> {
        return await this.prismaService.transacao.findFirst({ where: { usuario_id: user_id, id: transacao_id } });
    }
}
