import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/feedback-dialog/feedback-dialog.component'
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User | null = null;

  constructor(private authService: AuthService, public dialogService: DialogService) { 
    this.user = null;
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data: unknown) => {
      this.user = data as User
    });
  }

  public openFeedbackDialog(): void {
    this.dialogService.openFeedbackDialog();
  }
}
