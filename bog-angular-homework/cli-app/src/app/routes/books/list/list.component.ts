import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Observable } from 'rxjs';
import { IBook } from '../books.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  books$: Observable<IBook[]> = this.booksService.getBooks();

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit() {
  }

  onDelete(e: MouseEvent, book: IBook) {
    e.stopPropagation();
    this.booksService.deleteBook(book.id).toPromise().then(() => {
      this.books$ = this.booksService.getBooks();
    });
  }
}
