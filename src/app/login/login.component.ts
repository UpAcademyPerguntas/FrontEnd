import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    private router: Router,
    private authService: AuthService
  ) {
    // the place where it should be redirected if already logged in, temporarally i'll put the home page
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password:  new FormControl('', [Validators.required])
    });

  }

  // for easy access to form fields
  get formFields() { //antes era f
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('entrei');

    this.submitted = true;
    // stops here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.formFields.userName.value, this.formFields.password.value)
      .pipe(first()).subscribe(data => {
        console.log(data);


        if (this.authService.currentUserValue.role === 'manager') {
          this.router.navigate(['/home/manager']);
        } else if (this.authService.currentUserValue.role === 'admin') {
          this.router.navigate(['/home/admin']);
          //meter depois para onde reencaminhar mesmo

        }//falta fazer o else
      },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
