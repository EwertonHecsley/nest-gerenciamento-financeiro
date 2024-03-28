import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findAll(id: number): Promise<CategoriaDto[]> {
        return await this.prismaService.categoria.findMany({ where: { usuario_id: id } });
    }

    async create(id: number, descricao: string): Promise<CategoriaDto> {
        return await this.prismaService.categoria.create({ data: { descricao, usuario_id: id } });
    }
}
