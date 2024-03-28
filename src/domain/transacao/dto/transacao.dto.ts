import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TransacaoDto {

    @IsNotEmpty({ message: 'O campo descricao é obrigatório.' })
    @IsString()
    @ApiProperty()
    descricao: string;

    @IsNotEmpty({ message: 'O campo valor é obrigatório.' })
    @IsNumber()
    @ApiProperty()
    valor: number;

    @IsNotEmpty({ message: 'O campo data é obrigatório.' })
    @IsString()
    @ApiProperty()
    data_transacao: string;

    @IsNotEmpty({ message: 'O campo categoria_id é obrigatório.' })
    @IsNumber()
    @ApiProperty()
    categoria_id: number;

    @IsNotEmpty({ message: 'O campo tipo é obrigatório.' })
    @IsString()
    @ApiProperty()
    tipo: string;

    @IsOptional()
    @IsNumber()
    usuario_id?: number

    @IsOptional()
    id?: number;
}