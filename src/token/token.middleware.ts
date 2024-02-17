import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware appliqué');

    next();
  }
}
