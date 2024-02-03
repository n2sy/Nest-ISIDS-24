import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('task')
export class TaskController {
  tabTasks = [];

  @Get('all')
  getAllTasks(@Res() response: Response) {
    return response.json({ allTasks: this.tabTasks });
  }

  @Post('add')
  addTask(
    @Req() request: Request,
    @Body('year') annee,
    @Body('title') titre,
    @Res() response: Response,
  ) {
    let newId = uuidv4();
    this.tabTasks.push({
      id: newId,
      year: annee,
      title: titre,
      createdAt: new Date(),
    });
    response.json({ message: 'Task added successfully', id: newId });
  }
}
