import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeListComponent } from './components/code-list/code-list.component'

const routes: Routes = [
  { path: 'codes', component: CodeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
