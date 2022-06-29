import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'
import { UserGameListComponent } from './components/user-game-list/user-game-list.component'

const routes: Routes = [
  { path: 'codes', component: CodeListComponent },
  { path: 'games', component: UserGameListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
