import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findAll(id: number): Promise<CategoriaDto[]> {
        return await this.prismaService.categoria.findMany({ where: { usuario_id: id }, orderBy: { id: 'asc' } });
    }

    async create(id: number, descricao: string): Promise<CategoriaDto> {
        return await this.prismaService.categoria.create({ data: { descricao, usuario_id: id } });
    }

    async detail(user_id: number, categoria_id: number): Promise<CategoriaDto> {
        return await this.prismaService.categoria.findFirst({ where: { id: categoria_id, usuario_id: user_id }, include: { transacao: true } });
    }

    async update(user_id: number, categoria_id: number, descricao: string): Promise<CategoriaDto> {
        const categoria = await this.detail(user_id, categoria_id);
        if (!categoria) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        return await this.prismaService.categoria.update({ data: { descricao }, where: { usuario_id: user_id, id: categoria_id } });
    }

    async deleteCategory(user_id: number, categoria_id: number): Promise<CategoriaDto> {
        const categoria = await this.detail(user_id, categoria_id);
        if (!categoria) throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND);

        if (categoria.transacao.length > 0) throw new HttpException('Categoria possui transacao, nao pode ser deletada.', HttpStatus.BAD_REQUEST);

        return await this.prismaService.categoria.delete({ where: { usuario_id: user_id, id: categoria_id } });
    }
}
