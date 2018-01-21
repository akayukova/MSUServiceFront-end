import { EditorComponent } from './editor/editor.component';
import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks/tasks.component';
import {RequestComponent} from './request/request.component';
import {Routes, RouterModule} from '@angular/router';
import {MastersComponent} from './masters/masters.component';


const routes: Routes = [
  {path: 'tasks', component: TasksComponent },
  {path: 'request', component: RequestComponent },
  {path: 'editor/:id', component: EditorComponent },
  {path: 'masters', component: MastersComponent }
//  {path: 'dashboard', component: DashboardComponent },
//  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//  {path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


