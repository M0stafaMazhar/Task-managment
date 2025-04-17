import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async updateToken(user: UserDocument, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(user._id, { token });
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).select('-password');
  }
}
