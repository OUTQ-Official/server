import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Swagger Test Exmaple')
  .setDescription('Test API description')
  .setVersion('1.0')
  .addTag('OutQ')
  .build();
