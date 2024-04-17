
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';



@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,

  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  form: FormGroup;
  @Output() pageChange = new EventEmitter<number>();
  @Output() newLimit = new EventEmitter<number>();

  @Input() currentItem: number;
  @Input() total_count: number;
  @Input() title: string;
  @Input() limit_perPage: number;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visiblePages: any[] = [];
  currentPage: number = 1;
  totalPages: number;

  options: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      limit_perPage: new FormControl(50),
    });
  }
  ngOnInit(): void {
    this.form.get('limit_perPage')?.valueChanges.subscribe((value) => {
      this.newLimit.emit(value);
    });
  }



  ngOnChanges(): void {
    this.calculateTotalPages();
    this.updateVisiblePages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.currentItem / this.limit_perPage);
  }



  updateVisiblePages(): void {
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + 4);
    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
    if (startPage > 1) {
      this.visiblePages.unshift(1);
      if (startPage > 2) {
        this.visiblePages.unshift('...');
      }
    }
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        this.visiblePages.push('...');
      }
      this.visiblePages.push(this.totalPages);
    }
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  goToPage(page: any): void {
    if (page > 0 && page !== '...') {
      this.currentPage = page;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage);
    } else if (page === '...') {
      this.currentPage = 1;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage); // Emitir número de página
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisiblePages();
      this.pageChange.emit(this.currentPage); // Emitir número de página
    }

  }



}
