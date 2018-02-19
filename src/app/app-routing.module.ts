import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks/tasks.component';
import {RequestComponent} from './request/request.component';
import {RouterModule, Routes} from '@angular/router';
import {MastersComponent} from './masters/masters.component';
import {AuthComponent} from './auth/auth.component';
import {ShowStatusComponent} from './show-status/show-status.component';


const routes: Routes = [
  {path: 'tasks', component: TasksComponent},
  {path: 'request', component: RequestComponent},
  {path: 'masters', component: MastersComponent},
  {path: 'login', component: AuthComponent},
  {path: 'status', component: ShowStatusComponent },
  {path: '', redirectTo: 'request', pathMatch: 'full'},
//  {path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


