import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'
import { UserGameComponent } from './components/user-game/user-game.component'
import { UserCodeListComponent } from './components/user-code-list/user-code-list.component'

const routes: Routes = [
  { path: '', component: CodeListComponent },
  { path: 'codes', component: UserCodeListComponent },
  { path: 'games', component: UserGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
