import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'
import { UserGameComponent } from './components/user-game/user-game.component'

const routes: Routes = [
  { path: '', component: CodeListComponent },
  { path: 'codes', component: CodeListComponent },
  { path: 'games', component: UserGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
