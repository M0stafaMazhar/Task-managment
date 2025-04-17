import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userName: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      userName,
      email,
      password: hashed,
    });
    return { message: 'User registered successfully', userId: user._id };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    await this.userService.updateToken(user, token);

    return { token };
  }
}
