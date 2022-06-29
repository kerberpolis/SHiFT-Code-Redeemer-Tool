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
import { UserGameListComponent } from './components/user-game/user-game-list/user-game-list.component';
import { HeaderComponent } from './components/header/header.component';
import { UserGameComponent } from './components/user-game/user-game.component';
import { UserGameFormComponent } from './components/user-game/user-game-form/user-game-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCodeListComponent } from './components/user-code-list/user-code-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeListComponent,
    UserGameListComponent,
    UserGameFormComponent,
    HeaderComponent,
    UserGameComponent,
    UserCodeListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
