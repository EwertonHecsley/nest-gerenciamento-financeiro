import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CategoriaDto {

    @IsNotEmpty({ message: 'O campo descricao é obrigatorio.' })
    @IsString()
    descricao: string;

    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @IsOptional()
    transacao?: any[]

    @IsOptional()
    @IsNumber()
    id?: number
}