import { Controller, Get, Param } from '@nestjs/common';

@Controller('name')
export class NameController {

  @Get(':id')
  getName(@Param() params): string {
    console.log('params.id:: ', params.id);
    return `¡Hola ${params.id}!, ¡Eres Genial!`;
  }
}
