import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Catch,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // Create a task
  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return newTask.save();
  }

  // Get all tasks for a specific user
  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  // Get task details by ID, only if the authenticated user is the creator
  async getTaskById(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId, userId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found or you are not the creator');
    }
    return task;
  }

  // Update task by ID, only if the authenticated user is the creator
  async updateTask(
    userId: string,
    taskId: string,
    updateData: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId }, // Only update if the task belongs to the user
      { $set: updateData },
      { new: true }, // Return the updated task
    );
    if (!updatedTask) {
      throw new Error('Task not found or you are not the creator');
    }
    return updatedTask;
  }

  // Delete task by ID, only if the authenticated user is the creator
  async deleteTask(userId: string, taskId: string): Promise<Task> {
    const deletedTask = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });
    if (!deletedTask) {
      throw new Error('Task not found or you are not the creator');
    }
    return deletedTask;
  }
}
