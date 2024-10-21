import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      //forbidNonWhitelisted: true,
      //disableErrorMessages: true, 
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Comercial')
    .setDescription('Documentación de nuestra API comercial')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentos', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();