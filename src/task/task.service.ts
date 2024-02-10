import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/task';

@Injectable()
export class TaskService {
  tabTasks: Task[] = [];
  getTasks(): Task[] {
    return this.tabTasks;
  }

  ajouterTask(titre, annee) {
    let newId = uuidv4();

    this.tabTasks.push({
      id: newId,
      year: annee,
      title: titre,
      statut: 'todo',
      createdAt: new Date(),
    });

    return newId;
  }

  chercherTask(selectedId): Task {
    let task = this.tabTasks.find((element) => element.id == selectedId);
    return task;
    // this.tabTasks.find(element =>  {
    //     return element.id == selectedId
    // })
  }
  chercherTaskParAnnee(annee) {
    return this.tabTasks.filter((element) => element.year === annee);
  }
}
