import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProjectoFinal';//perguntar se se pode apagar
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
