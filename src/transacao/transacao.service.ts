import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class TransacaoService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll(user_id: number): Promise<any[]> {
        return await this.prismaService.transacao.findMany({ where: { usuario_id: user_id } });
    }
}
