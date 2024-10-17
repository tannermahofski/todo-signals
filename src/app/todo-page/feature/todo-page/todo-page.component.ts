import { Component, OnInit, signal } from '@angular/core';
import { TodoItem } from '../../models/todo-item';
import { TodoListItemComponent } from '../../ui/todo-list-item/todo-list-item.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoListItemComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent implements OnInit {
  taskInput = signal('');
  tasks = signal<TodoItem[]>([]);

  ngOnInit(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks.set(JSON.parse(storedTasks));
    } else {
      console.log('No tasks stored yet');
    }
  }

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.taskInput.set(input);
  }

  addTask() {
    if (this.taskInput().trim() === '') {
      return;
    }

    this.tasks.update((value) => [
      ...value,
      {
        id: value.length + 1,
        title: this.taskInput(),
        completed: false,
      },
    ]);

    this.taskInput.set('');

    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  clickTask(task: TodoItem) {
    console.log(task.id);
  }

  onDelete = (task: TodoItem): void => {
    this.tasks.set(this.tasks().filter((value) => value.id !== task.id));
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  };
}
