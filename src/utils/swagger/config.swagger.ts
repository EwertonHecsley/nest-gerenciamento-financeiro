import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
    .setTitle('API RESTful Gerenciamento Financeiro')
    .setDescription('Gerenciamento de operações financeiras')
    .setVersion('1.0.0')
    .addTag('DinDin')
    .build();