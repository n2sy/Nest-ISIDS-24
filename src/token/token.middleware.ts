import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    let headers = req.get('authorization');
    if (!headers) {
      throw new UnauthorizedException('Please log in...');
    }
    let tab = headers.split(' ');
    let decodedToken = this.jwtService.verify(tab[1]);
    if (!decodedToken) {
      throw new UnauthorizedException('Token not valid...');
    }

    next();
  }
}
