import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role = "";
  managerName: any;

  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
}

logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

  ngOnInit() {
    this.role = localStorage.getItem("currentUserRole");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.managerName = currentUser.userName;
  }

}
