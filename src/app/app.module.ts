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
    MatToolbarModule,
    MatIconModule,
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
