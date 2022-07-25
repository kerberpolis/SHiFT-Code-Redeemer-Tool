import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/models/userData';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.component.html',
  styleUrls: ['./email-change.component.scss']
})
export class EmailChangeComponent {
  @Input() user: User | null = null;
  updateEmailForm: FormGroup;

  constructor(private authService: AuthService, private validatorService: ValidatorService, private formBuilder: FormBuilder) {
    this.updateEmailForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        email_confirm: new FormControl('', [Validators.required, Validators.email]),
      },
      {
        validators: this.validatorService.mustMatch('email', 'email_confirm')
      }
    );
   }

   get f() {
    return this.updateEmailForm.controls;
  }

   onSubmit() {
    if(this.updateEmailForm.valid && this.user){
      const userData = this.updateEmailForm.value as UserData
      this.authService.updateUser(userData, this.user._id).subscribe((response: unknown) => { 
        const user = <User>response
        const userData = <User>{
          email: user.email,
          password: user.password
        }
        
        this.authService.setToken(userData).subscribe(
          (response: unknown) => {
            localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, JSON.stringify(response));
            this.authService.setCurrentUser().subscribe((user: unknown) => {
              localStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify(user));
              this.authService.userSubject.next(user as User);
            });
          });
      });
    }
   }

}
