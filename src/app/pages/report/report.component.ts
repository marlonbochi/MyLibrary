import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Book } from '../../model/book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  books: Book[] = [];
  searchForm: FormGroup;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;

  constructor(private title: Title,
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private calendar: NgbCalendar,
    private toast: ToastrService) {

    title.setTitle("My Library - Report");

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 30);

    this.books = [];
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  viewReport(){
    console.log(this.fromDate);
    if(this.fromDate == null){
      this.toast.error("Missing start date");

      return false;
    }
    if(this.toDate == null){
      this.toast.error("Missing last date");     

      return false; 
    }
    this.libraryService.loading(true);

    //Review, because it did not work as it should.
    let dateFirst = new Date(this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day);
    //Review, because it did not work as it should.

    let dateLast = new Date(this.toDate.year, this.toDate.month, this.toDate.day, 23,59,59);

    this.books = [];
    this.libraryService.getMyBooks().then((books) => {
      books.forEach(book => {        
        if(book.DateRead >= dateFirst && book.DateRead <= dateLast && book.Read){
          this.books.push(book);
        }
      });

      this.libraryService.loading(false);
      if(this.books.length == 0){
        this.toast.warning("No books found");
      }
    });
  }

}
