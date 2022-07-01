import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'
import { UserGameComponent } from './components/user-game/user-game.component'
import { UserCodeListComponent } from './components/user-code-list/user-code-list.component'
import { LoginComponent } from './components/login/login.component'
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: CodeListComponent },
  { path: 'codes', component: UserCodeListComponent, canActivate:[AuthService] },
  { path: 'games', component: UserGameComponent, canActivate:[AuthService] },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
