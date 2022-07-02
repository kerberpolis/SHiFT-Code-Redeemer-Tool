import { Component, OnInit } from '@angular/core';
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
  registerForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private location: Location, private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        gearbox_email: new FormControl(null, [Validators.email]),
        gearbox_password: new FormControl(null, []),
      }
    );
   }

  ngOnInit(): void {
  }

  get password() {
    return this.registerForm.get('password');
  }  

  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    this.authService.register(this.registerForm.value).subscribe((data: any) => {
        console.log(data);
    });

    this.router.navigateByUrl('');
  }

  back(): void {
    this.location.back()
  }
}
