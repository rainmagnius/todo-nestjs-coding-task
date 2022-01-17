import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateFinishedTaskDto } from './dto/update-finished-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/done')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateFinished(@Param('id') id: string, @Body() updateFinishedTaskDto: UpdateFinishedTaskDto) {
    return this.tasksService.updateFinished(id, updateFinishedTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
