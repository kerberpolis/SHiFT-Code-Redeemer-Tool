import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {
  public error = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) {}
   
  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token){
      this.authService.verifyUser(token).subscribe(
        (response: unknown) => {
          if(!response){
            this.error = true; 
          }
        },
        (error: HttpErrorResponse) => {
            this.error = true;
        }        
      );
      }
  }
}
