import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { BookFormService } from './book-form.service';
import { IBook } from '../books.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    public bookFormService: BookFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setBookById();
  }

  onSubmit() {
    if (this.bookFormService.form.valid) {
      const book: IBook = Object.assign({}, this.bookFormService.form.value);

      if (book.id) {
        this.booksService.editBook(book).toPromise().then((editedBook: IBook) => {
          if (editedBook) {
            this.router.navigate(['/books/list']).then();
          }
        });
      } else {
        this.booksService.addBook(book).toPromise().then((addedBook: IBook) => {
          if (addedBook) {
            this.router.navigate(['/books/list']).then();
          }
        });
      }
    } else {
      this.bookFormService.form.markAsDirty();
    }
  }

  private setBookById() {
    const bookId = +this.activatedRoute.snapshot.paramMap.get('bookId');

    if (bookId) {
      this.booksService.getBook(bookId).toPromise().then((book: IBook) => {
        this.bookFormService.form.patchValue(book);
      });
    } else {
      this.bookFormService.form.reset();
    }
  }
}
