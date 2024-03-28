import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [TransacaoService, PrismaService],
  controllers: [TransacaoController]
})
export class TransacaoModule { }
