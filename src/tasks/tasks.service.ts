import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateFinishedTaskDto } from './dto/update-finished-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('group');
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async updateFinished(id: string, updateFinishedTaskDto: UpdateFinishedTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, updateFinishedTaskDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    return this.taskModel.deleteOne({ _id: id });
  }
}
