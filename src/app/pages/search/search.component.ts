import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpenLibraryService } from '../../services/openlibrary.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string = "";
  searchForm: FormGroup;
  page: number = 1

  constructor(
    private title: Title, 
    private openLibraryService: OpenLibraryService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        if(params["query"] != undefined){
          this.query = params["query"];
        }

        if(params["page"] != undefined){
          this.page = params["page"];
        }
      });
      
    title.setTitle("My Library - Search");

    this.searchForm = this.fb.group({
        query: [this.query, [Validators.required, Validators.minLength(3)] ]
    });

    if(this.query != ""){
      this.searchBooks();
    }
  }

  ngOnInit() {
  }

  searchBooks(){

    if(this.searchForm.valid){
      this.openLibraryService.searchBooks(this.searchForm.controls["query"].value, this.page).subscribe((books) => {
        console.log(books);
      });
    }else{

    }
  }

}
