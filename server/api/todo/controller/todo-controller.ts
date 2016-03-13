/// <reference path="../../../typings/main.d.ts" />

import TodoDAO from '../dao/todo-dao';

export class TodoController {
  static getAll(req:any, res:any):void {
    TodoDAO
    .getAll()
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(400).json(error));
  }

  static createTodo(req:any, res:any):void {
    let _todo = req.body;

    TodoDAO
    .createTodo(_todo)
    .then(todo => res.status(201).json(todo))
    .catch(error => res.status(400).json(error));
  }

  static deleteTodo(req:any, res:any):void {
    let _id = req.params.id;

    TodoDAO
    .deleteTodo(_id)
    .then(() => res.status(200).end())
    .catch(error => res.status(400).json(error));
  }
}
