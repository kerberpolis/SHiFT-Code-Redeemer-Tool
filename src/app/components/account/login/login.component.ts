import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup 

  constructor(private authService: AuthService, private router: Router, private location: Location) { 
    // redirect to home if already logged in
    if (this.authService.userSubject.value) { 
      this.router.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.authService.setToken(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, JSON.stringify(response));
          this.authService.setCurrentUser().subscribe((user: any) => {
            localStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify(user));
            this.authService.userSubject.next(user);
            if (this.authService.userSubject.value)
              this.router.navigate(['/']);
          });
        },
        (error: any) => {
          if (error.status === 401) {
            this.loginForm.setErrors({ unauthorised: true });
          }
        }        
      );
    }
  }

  back(): void {
    // edge case for when there is no location
    // https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page
    this.location.back()
  }
}
