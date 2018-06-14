import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title) {

    title.setTitle("My Library - Home");
  }

  ngOnInit() {
  }

  NotRead(){
    
  }

}
