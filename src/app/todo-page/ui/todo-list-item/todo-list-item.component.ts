import { Component, Input, input } from '@angular/core';
import { TodoItem } from '../../models/todo-item';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
})
export class TodoListItemComponent {
  task = input.required<TodoItem>();
  @Input() onDelete!: (task: TodoItem) => void;

  delete() {
    // console.log('Deleting this one [CHILD]');
    this.onDelete(this.task());
  }
}
