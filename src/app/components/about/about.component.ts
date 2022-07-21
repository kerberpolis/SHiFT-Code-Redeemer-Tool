import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private dialogService: DialogService) { }

  public openFeebackDialog(): boolean {
    this.dialogService.openFeedbackDialog();
    return false;
  }
}
