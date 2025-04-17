// task.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.create(userId, createTaskDto);
  }

  // Get all tasks for the authenticated user
  @Get()
  getTasks(@Request() req) {
    const userId = req.user.userId;
    return this.taskService.getTasksByUser(userId);
  }

  // Get task details
  @Get(':id')
  getTask(@Param('id') taskId: string, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.getTaskById(userId, taskId);
  }

  // Update task
  @Put(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body() updateData: CreateTaskDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.taskService.updateTask(userId, taskId, updateData);
  }

  // Delete task
  @Delete(':id')
  deleteTask(@Param('id') taskId: string, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.deleteTask(userId, taskId);
  }
}
