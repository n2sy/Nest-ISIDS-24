import { Controller, Get } from '@nestjs/common';

@Controller('isids')
export class AppController {
  constructor() {}

  @Get('hi')
  getHello(): string {
    return `<ol>
    <li>Mehdi</li>
    <li>Nidhal</li>`;
  }
  @Get('malek')
  getHelloFromMalek(): string {
    return `<p>Je suis Malek</p>`;
  }
}
