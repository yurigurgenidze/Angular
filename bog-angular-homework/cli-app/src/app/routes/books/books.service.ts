import { Injectable } from '@angular/core';
import { IBook } from './books.model';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _bookCount = 1;
  private _books: IBook[] = [{
    id: 1,
    title: 'Book',
    shortDescription: 'Short description of book'
  }];

  constructor() { }

  getBooks() {
    return of(this._books);
  }

  getBook(id: number) {
    return this.getBooks().pipe(
      map((books) => {
        return books.find(b => b.id === id);
      })
    );
  }

  addBook(book: IBook) {
    const books = this._books.slice();
    book.id = ++this._bookCount;
    books.push(book);

    this._books = books;

    return of(book);
  }

  editBook(book: IBook) {
    const books = this._books.slice();
    const currentIndex = books.findIndex((b) => b.id === book.id);
    books[currentIndex] = book;

    this._books = books;
    return of(book);
  }

  deleteBook(id: number) {
    const books = this._books.slice();
    const existingIndex = books.findIndex(b => b.id === id);

    books.splice(existingIndex, 1);
    this._books = books;
    return of(true);
  }
}
