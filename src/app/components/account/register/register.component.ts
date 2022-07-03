import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  gearboxSubmitted: boolean = false;
  gearboxFormValid: boolean = true;
  validateSuccess: any = null;
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
    this.registerForm.controls['gearbox_email']!.valueChanges.subscribe((value: any) => {
      this.registerForm.get('gearbox_email')!.markAsPristine()
      this.checkGearboxValid()
    });
    this.registerForm.controls['gearbox_password']!.valueChanges.subscribe((value: any) => {
      this.registerForm.get('gearbox_password')!.markAsPristine()  
      this.checkGearboxValid()
    });
  }

  checkGearboxValid() {
    if(this.registerForm.get('gearbox_email')!.valid && !this.registerForm.get('gearbox_email')!.dirty
      && this.registerForm.get('gearbox_password')!.valid && !this.registerForm.get('gearbox_password')!.dirty
      && this.registerForm.get('gearbox_email')!.value && this.registerForm.get('gearbox_password')!.value){
      this.gearboxFormValid = false;
    }else{
      this.gearboxFormValid = true;
    }
  }

  get f() {
    return this.registerForm.controls;
  }



  async onSubmit() {
    if (this.registerForm.valid){  
      if(((this.registerForm.get('gearbox_email')!.value && this.registerForm.get('gearbox_password')!.value) && this.validateSuccess) ||
      (!this.registerForm.get('gearbox_email')!.value && !this.registerForm.get('gearbox_password')!.value)){
        // check if both gearbox password and email are present or both not present
        this.authService.register(this.registerForm.value).subscribe((data: any) => {
            console.log(data);
        });
        this.router.navigateByUrl('');
      }
    }
  }

  canVerify() {
    if (!this.registerForm.get('gearbox_email')!.valid && this.registerForm.get('gearbox_email')!.dirty &&
    this.registerForm.get('gearbox_password')!.dirty) { 
      return false
    }
    return true
  }

  verifyGearbox() {
    // set button to default
    this.validateSuccess = null;


    // if either gearbox inputs are empty, set as dirty/touched to display errer msg
    if (!this.registerForm.get('gearbox_email')!.value){
      this.registerForm.get('gearbox_email')!.markAsTouched()
      this.registerForm.get('gearbox_email')!.markAsDirty()
      console.log(this.registerForm.get('gearbox_email')!.value)
    }
    if (!this.registerForm.get('gearbox_password')!.value){
      this.registerForm.get('gearbox_password')!.markAsTouched()
      this.registerForm.get('gearbox_password')!.markAsDirty()
    }

    // if gearbox form data is valid, send request to verify details
    if (!this.registerForm.get('gearbox_email')!.invalid && !this.registerForm.get('gearbox_email')!.dirty &&
      !this.registerForm.get('gearbox_password')!.dirty) {
      const gearboxData = {
        'gearbox_email': this.registerForm.get('gearbox_email')!.value,
        'gearbox_password': this.registerForm.get('gearbox_password')!.value
      }

      this.gearboxSubmitted = true;

      this.authService.verifyGearbox(gearboxData).subscribe((data: any) => {
        this.gearboxSubmitted = false;
        if(data){
          // make button green
          this.validateSuccess = true
        }else{
          // make button red
          this.validateSuccess = false
        }
      });
    }
  }

  back(): void {
    this.location.back()
  }
}
