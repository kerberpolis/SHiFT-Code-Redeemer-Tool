import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/models/userData';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gearbox-verify',
  templateUrl: './gearbox-verify.component.html',
  styleUrls: ['./gearbox-verify.component.scss']
})
export class GearboxVerifyComponent {

  gearboxSubmitted = false;  // used to show the spinning icon while gearbox details are being verified.
  gearboxFormValid = true;  // checks if gearbox details in form are valid
  gearboxValidateSuccess: boolean | null = null;  // check if gearbox account exists
  public gearboxForm: FormGroup
  public fieldTextType = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.gearboxForm = formBuilder.group({
        gearbox_email: new FormControl('', [Validators.required, Validators.email]),
        gearbox_password: new FormControl('', [Validators.required])
      }
    );
   }

   ngOnInit(): void {
    const gearbox_email = this.gearboxForm.get('gearbox_email')
    const gearbox_password = this.gearboxForm.get('gearbox_password')
    
    if (gearbox_password && gearbox_email){
      gearbox_email.valueChanges.subscribe((value: unknown) => {
        gearbox_email.markAsPristine()
        this.checkGearboxValid()
      });
      gearbox_password.valueChanges.subscribe((value: unknown) => {
        gearbox_password.markAsPristine()  
        this.checkGearboxValid()
      });
    }
    
  }

   get f() {
    return this.gearboxForm.controls;
  }

  checkGearboxValid() {
    this.gearboxValidateSuccess = null;  // set verify button to default
    const gearbox_email = this.gearboxForm.get('gearbox_email')
    const gearbox_password = this.gearboxForm.get('gearbox_password')
    
    if (gearbox_password && gearbox_email){
      if(gearbox_email.valid && !gearbox_email.dirty
        && gearbox_password.valid && !gearbox_password.dirty
        && gearbox_email.value && gearbox_password.value){
        this.gearboxFormValid = false;
      }else{
        this.gearboxFormValid = true;
      }
    }
  }

  async onSubmit() {
    const gearbox_email = this.gearboxForm.get('gearbox_email')
    const gearbox_password = this.gearboxForm.get('gearbox_password')

    if (this.gearboxForm.valid && gearbox_password && gearbox_email){
      if ((gearbox_email.value || gearbox_password.value) && !this.gearboxValidateSuccess){
          // if gearbox values are present but details are not verified, display error message 'account not verified'
          this.gearboxForm.setErrors({ unverifiedGearbox : true });
          return
      }  
     
      // check if both gearbox password and email are present or both not present
      this.authService.updateGearboxDetails(this.gearboxForm.value as UserData).subscribe(
        (response: unknown) => {
            console.log(response)
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }      
      );       
    }
  }

  canVerify() {
    const gearbox_email = this.gearboxForm.get('gearbox_email')
    const gearbox_password = this.gearboxForm.get('gearbox_password')

    if(gearbox_email && gearbox_password){
      if (!gearbox_email.valid && gearbox_email.dirty &&
        gearbox_password.dirty)
        return false
    }
    return true
  }

  verifyGearbox() {
    this.gearboxValidateSuccess = null;  // set verify button to default
    const gearbox_email = this.gearboxForm.get('gearbox_email')
    const gearbox_password = this.gearboxForm.get('gearbox_password')

    // if either gearbox inputs are empty, set as dirty/touched to display errer msg
    if(gearbox_email){
      if (!gearbox_email.value){
        gearbox_email.markAsTouched()
        gearbox_email.markAsDirty()
        console.log(gearbox_email.value)
      }
    }
    
    if(gearbox_password){
      if (!gearbox_password.value){
        gearbox_password.markAsTouched()
        gearbox_password.markAsDirty()
      }
    }

    if(gearbox_email && gearbox_password){
      // if gearbox form data is valid, send request to verify details
      if (!gearbox_email.invalid && !gearbox_email.dirty &&
        !gearbox_password.dirty) {
        const gearboxData = {
          'gearbox_email': gearbox_email.value,
          'gearbox_password': gearbox_password.value
        }

        this.gearboxSubmitted = true;  // show spinner
        this.authService.verifyGearbox(gearboxData).subscribe((data: unknown) => {
          this.gearboxSubmitted = false;  // hide spinner
          if(data){
            // make button green
            this.gearboxValidateSuccess = true
          }else{
            // make button red
            this.gearboxValidateSuccess = false
          }
        });
      }
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
