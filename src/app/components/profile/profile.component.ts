import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User | null;

  constructor(private authService: AuthService) { 
    this.user = null;
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data: any) => {
      this.user = data
    });
  }

}
