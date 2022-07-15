import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GithubService } from 'src/app/services/github.service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {

  public feedbackForm: FormGroup;
  public deviceInfo: DeviceInfo;

  constructor(public dialogRef: MatDialogRef<unknown>,
    private formBuilder: FormBuilder,
    private githubService: GithubService,
    private deviceService: DeviceDetectorService,
    private router: Router) {
    this.feedbackForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    this.deviceInfo = this.deviceService.getDeviceInfo()
  }

  public submitFeedback(): void {
    if(this.feedbackForm.valid){
      const data = {
        title: this.feedbackForm.controls['title'].value,
        desc: this.feedbackForm.controls['description'].value,
        page: this.router.url,
        browser: this.deviceInfo.browser,
        browser_version: this.deviceInfo.browser_version,
        width: window.innerWidth, 
        height: window.innerHeight,
        os: this.deviceInfo.os,
      }

      this.githubService.submitFeedback(data).subscribe(
        (response: any) => {
          if(response == true){
            this.dialogRef.close([]);
          }
        },
        (error: any) => {
          this.feedbackForm.setErrors({ failed: true });
        }        
      );
    }
  }
}
