import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findAll(id: number): Promise<any> {
        return await this.prismaService.categoria.findMany({ where: { usuario_id: id } });
    }
}
