import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((data: unknown) => {
      this.user = data as User
    });
  }
  
  logout(): void {
    this.authService.logout();
  }
}
