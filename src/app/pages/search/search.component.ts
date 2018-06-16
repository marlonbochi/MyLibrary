import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpenLibraryService } from '../../services/openlibrary.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../../model/book.model';
import { Config } from '../../config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = "";
  searchForm: FormGroup;
  page: number = 1;
  typeSearch: string = "title";
  books: any = [];
  message: string = "type to search ...";
  config: Config = new Config();
  numberPages: any = [];

  haveBooks: boolean = false;

  constructor(
    private title: Title,
    private openLibraryService: OpenLibraryService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params["query"] != undefined) {
        this.query = params["query"];
      }

      if (params["typeSearch"] != undefined) {
        this.typeSearch = params["typeSearch"];
      }

      if (params["page"] != undefined) {
        this.page = params["page"];
      }
    });

    title.setTitle("My Library - Search");

    this.searchForm = this.fb.group({
      query: [this.query, [Validators.required, Validators.minLength(3)]],
      typeSearch: [this.typeSearch]
    });

    if (this.query != "") {
      this.searchBooks();
    }

    this.books = [];
    this.numberPages = [];
  }

  ngOnInit() {
  }

  searchBooks(page: number = 1) {

      this.page = page;
      this.openLibraryService.loading(true);
      this.books = [];
      this.numberPages = [];
      
      this.openLibraryService.searchBooks(this.searchForm.controls["query"].value, this.searchForm.controls["typeSearch"].value, page)
        .subscribe((books) => {
          if (books.docs.length > 0) {
            books.docs.forEach(bookApi => {
              if (bookApi.cover_edition_key != undefined) {
                let book = new Book();
                book.Id = bookApi.cover_edition_key;
                book.Author = bookApi.author_name;
                book.Name = bookApi.title;
                book.Link = this.config.urlLinkBook + book.Id;
                book.Image = this.config.urlImages + book.Id + '-M.jpg';

                this.books.push(book);
              }

            });

            for(var i=0; i < Math.ceil(books.num_found / 100);i++){
              this.numberPages.push(i + 1);
            }
            
            this.haveBooks = true;
            this.openLibraryService.loading(false);
          } else {
            this.message = "No books found!";
            this.haveBooks = false;
            this.openLibraryService.loading(false);
          }
        });
  }

  addBookMyLibrary(book: Book, read: boolean) {
    this.openLibraryService.loading(true);
    if (read) {
      book.DateRead = new Date();
    }
    book.Read = read;
    this.openLibraryService.addStorage(book);
    this.openLibraryService.loading(false);
  }

  getStylePagination(page1, page2) {
    if(page1 == page2){
      return "page-item active";
    }else{
      return "page-item";
    }
  }

}
