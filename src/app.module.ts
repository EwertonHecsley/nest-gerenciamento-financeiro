import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioMiddleware } from './usuario/middleware/usuario.middleware';
import { UsuarioService } from './usuario/usuario.service';
import { PrismaService } from './database/prisma/prisma.service';
import { CategoriaModule } from './categoria/categoria.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [UsuarioModule, AuthModule, CategoriaModule, TransacaoModule],
  controllers: [],
  providers: [PrismaService, UsuarioService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsuarioMiddleware)
      .forRoutes({ path: 'usuario', method: RequestMethod.PUT });
  }
}
