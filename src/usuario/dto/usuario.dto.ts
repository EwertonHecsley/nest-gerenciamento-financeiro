import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UsuarioDto {

    @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'O campo email é obrigatório.' })
    @IsString()
    @IsEmail({}, { message: 'Formato de email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
    @IsString()
    @MinLength(4, { message: 'Senha deve ter no mínimo 4 caracteres.' })
    senha: string;

    @IsOptional()
    id?: number;
}