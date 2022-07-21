import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../components/feedback-dialog/feedback-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openFeedbackDialog(): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '500px'
    });

  }
}
