import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('user-data')
  async getUserData(@Request() req): Promise<User> {
    const userId = (req as any).user?.userId;
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
