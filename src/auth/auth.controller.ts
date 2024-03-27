import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    async login(
        @Body() dataLogin: LoginDto,
        @Req() req: Request,
        @Res() res: Response) {

        const { email, senha } = dataLogin;

        const result = await this.authService.validateUser(email, senha);
        const token = await this.authService.getToken(result);

        const { senha: _, ...usuario } = result;

        req.user = usuario;

        return res.status(HttpStatus.ACCEPTED).json({ mensagem: 'Usuário logado com sucesso.', usuario, token });

    }
}
