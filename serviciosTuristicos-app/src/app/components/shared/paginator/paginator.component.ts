import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  onPageChange(event: any): void {
    this.pageChanged.emit(event);
  }
}
