import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UsuarioDto {

    @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
    @IsString()
    @ApiProperty()
    nome: string;

    @IsNotEmpty({ message: 'O campo email é obrigatório.' })
    @IsString()
    @IsEmail({}, { message: 'Formato de email inválido.' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
    @IsString()
    @MinLength(4, { message: 'Senha deve ter no mínimo 4 caracteres.' })
    @ApiProperty()
    senha: string;

    @IsOptional()
    id?: number;
}