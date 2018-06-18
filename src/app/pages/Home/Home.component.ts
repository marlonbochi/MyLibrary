import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../model/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  books: any = [];
  booksRead: Book[] = [];
  booksNotRead: Book[] = [];

  constructor(private title: Title,
    private libraryService: LibraryService,
    private toast: ToastrService) {

    title.setTitle("My Library - Home");

    this.libraryService.loading(true);
    this.getTheMyBooks();
  }

  ngOnInit() {
  }

  getTheMyBooks(){
    this.booksRead = [];
    this.booksNotRead = [];

    this.libraryService.getMyBooks().
    then(books => {
      if(books.length > 0){
        books.forEach(book => {
          
          if(book.Read){
            this.booksRead.push(book);
          }else{
            this.booksNotRead.push(book);
          }
        });
      }
      this.libraryService.loading(false);
    }).catch(error => {
        console.error(error);
        alert(error.message);

        this.libraryService.loading(false);
    });
  }

  Read(book: Book, read: boolean) {
    this.libraryService.loading(true);
    book.Read = read;
    if(read){
      book.DateRead = new Date();
    }
    this.libraryService.updateBook(book.IdBook, book).then(() => {
      this.getTheMyBooks();

      this.toast.success("Book updated");
    });
  }

  DeleteBook(book: Book) {
    this.libraryService.loading(true);    
    this.libraryService.deleteBook(book.IdBook).then(() => {
      this.getTheMyBooks();

      this.toast.success("Book deleted from Library");
    });
  }
  
}
