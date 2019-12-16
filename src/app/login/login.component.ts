import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // the place where it should be redirected if already logged in, temporarally i'll put the home page
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stops here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    //verificar sem backend
    // this.authService.login(this.f.username.value, this.f.password.value).subscribe(data => {
    //   console.log(data);
    //    })

    // com backend
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(data => {
        console.log(data);

        this.router.navigate([this.returnUrl]);//perguntar sobre isto
      },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
