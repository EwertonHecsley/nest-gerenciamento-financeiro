import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
}
