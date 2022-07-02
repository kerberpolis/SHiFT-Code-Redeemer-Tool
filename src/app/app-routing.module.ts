import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'
import { UserGameComponent } from './components/user-game/user-game.component'
import { UserCodeListComponent } from './components/user-code-list/user-code-list.component'
import { LoginComponent } from './components/account/login/login.component'
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/account/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: CodeListComponent },
  { path: 'codes', component: UserCodeListComponent, canActivate:[AuthService] },
  { path: 'games', component: UserGameComponent, canActivate:[AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
