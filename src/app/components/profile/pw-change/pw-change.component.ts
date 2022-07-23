import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common'
import { UserData } from 'src/app/models/userData';
import { ValidatorService } from 'src/app/services/validator.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pw-change',
  templateUrl: './pw-change.component.html',
  styleUrls: ['./pw-change.component.scss']
})
export class PwChangeComponent {
  @Input() user: User | null = null;

  public updatePasswordForm: FormGroup
  public fieldTextType = false;
  public repeatFieldTextType = false;

  constructor(private authService: AuthService, private validatorService: ValidatorService, private formBuilder: FormBuilder, private location: Location) {
    this.updatePasswordForm = this.formBuilder.group({
        old_password: new FormControl('', [Validators.required]),
        new_password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
        new_password_confirm: new FormControl('', [Validators.required]),
      },
      {
        validator: this.validatorService.mustMatch('new_password', 'new_password_confirm'),

      }
    );
   }

  get f() {
    return this.updatePasswordForm.controls;
  }

  onSubmit() {
    if(this.updatePasswordForm.valid && this.user){
      const userData = <UserData>{
        password: this.updatePasswordForm.controls['new_password'].value
      }
      this.authService.updateUser(userData, this.user._id).subscribe((result: unknown) => {
          console.log(result)
      })
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  back(): void {
    this.location.back()
  }
}
