import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role = "";

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem("currentUserRole");
  }

}
