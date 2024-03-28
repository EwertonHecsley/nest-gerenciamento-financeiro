import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsuarioService } from "../usuario.service";
import { UsuarioDto } from "../dto/usuario.dto";

@Injectable()
export class UsuarioMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsuarioService) { }

    async use(req: Request, _res: Response, next: NextFunction) {
        const { nome, email, senha } = req.body as UsuarioDto;

        if (!nome || !email || !senha) throw new HttpException('Todos os campos devem ser preenchidos (nome, email e senha).', HttpStatus.BAD_REQUEST);

        const verifyEmail = await this.userService.findUserByEmail(email);
        if (verifyEmail) throw new HttpException('E-mail já cadastrado para outro usuário', HttpStatus.BAD_REQUEST);

        next();
    }
}