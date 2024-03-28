import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioService } from 'src/domain/usuario/usuario.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  providers: [
    AuthService,
    UsuarioService,
    PrismaService,
    JwtService,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule { }
