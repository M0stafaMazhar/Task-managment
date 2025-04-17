import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service'; // Import UserService to validate user if needed
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Un authorized access');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET')!;
      const decoded = jwt.verify(token, secret) as any;
      (req as any).user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
