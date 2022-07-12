import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  gearboxSubmitted = false;  // used to show the spinning icon while gearbox details are being verified.
  gearboxFormValid = true;  // checks if gearbox details in form are valid
  gearboxValidateSuccess: boolean | null = null;  // check if gearbox account exists
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private location: Location, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.registerForm = formBuilder.group({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        gearbox_email: new FormControl(null, [Validators.email]),
        gearbox_password: new FormControl(null, [])
      }
    );
   }

  ngOnInit(): void {
    const gearbox_email = this.registerForm.get('gearbox_email')
    const gearbox_password = this.registerForm.get('gearbox_password')
    
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

  checkGearboxValid() {
    this.gearboxValidateSuccess = null;  // set verify button to default
    const gearbox_email = this.registerForm.get('gearbox_email')
    const gearbox_password = this.registerForm.get('gearbox_password')
    
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

  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    const gearbox_email = this.registerForm.get('gearbox_email')
    const gearbox_password = this.registerForm.get('gearbox_password')

    if (this.registerForm.valid && gearbox_password && gearbox_email){
      if ((gearbox_email.value || gearbox_password.value) && !this.gearboxValidateSuccess){
          // if gearbox values are present but details are not verified, display error message 'account not verified'
          this.registerForm.setErrors({ unverifiedGearbox : true });
          return
      }  
     
      // check if both gearbox password and email are present or both not present
      this.authService.register(this.registerForm.value).subscribe(
        (response: unknown) => {
            console.log(response)
            this.router.navigateByUrl('');
        },
        (error: HttpErrorResponse) => {
          console.log(error)
          this.registerForm.setErrors({ invalidUser: true });
        }      
      );       
    }
  }

  canVerify() {
    const gearbox_email = this.registerForm.get('gearbox_email')
    const gearbox_password = this.registerForm.get('gearbox_password')

    if(gearbox_email && gearbox_password){
      if (!gearbox_email.valid && gearbox_email.dirty &&
        gearbox_password.dirty)
        return false
    }
    return true
  }

  verifyGearbox() {
    this.gearboxValidateSuccess = null;  // set verify button to default
    const gearbox_email = this.registerForm.get('gearbox_email')
    const gearbox_password = this.registerForm.get('gearbox_password')

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

  back(): void {
    this.location.back()
  }
}
