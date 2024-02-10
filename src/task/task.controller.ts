import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AddTaskDTO } from './DTO/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  @Inject(TaskService) taskSer;
  // constructor(private taskSer: TaskService) {}
  @Get('all')
  getAllTasks(@Res() response: Response) {
    let tab = this.taskSer.getTasks();
    return response.status(200).json({ allTasks: tab });
  }

  @Post('add')
  addTask(
    @Req() request: Request,
    @Body() newT: AddTaskDTO,
    @Res() response: Response,
  ) {
    console.log(newT);

    let id = this.taskSer.ajouterTask(newT['title'], newT['year']);
    return response.json({ message: 'Task added successfully', id });
  }

  @Get(':id')
  getTaskById(@Param('id') id, @Res() response: Response) {
    let task = this.taskSer.chercherTask(id);
    if (!task) {
      return response
        .status(404)
        .json({ message: 'Y a aucn task avec cet ID' });
    }
    return response.json(task);
  }

  @Get('sort/:year')
  searchByYear(@Param('year', ParseIntPipe) year, @Res() response: Response) {
    let tab = this.taskSer.chercherTaskParAnnee(year);
    return response.json({ selectedTasks: tab });
  }
}
