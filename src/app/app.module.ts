import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './components/header/header.component';
import { UserGameComponent } from './components/user-game/user-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCodeListComponent } from './components/user-code-list/user-code-list.component';
import { LoginComponent } from './components/account/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterComponent } from './components/account/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutComponent } from './components/about/about.component';
import { VerifiedComponent } from './components/account/verified/verified.component';
import { PwChangeComponent } from './components/profile/pw-change/pw-change.component';
import { GearboxVerifyComponent } from './components/profile/gearbox-verify/gearbox-verify.component';
import { EmailChangeComponent } from './components/profile/email-change/email-change.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeListComponent,
    HeaderComponent,
    UserGameComponent,
    UserCodeListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FeedbackDialogComponent,
    AboutComponent,
    VerifiedComponent,
    PwChangeComponent,
    GearboxVerifyComponent,
    EmailChangeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatMenuModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
