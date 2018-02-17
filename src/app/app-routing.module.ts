import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks/tasks.component';
import {RequestComponent} from './request/request.component';
import {RouterModule, Routes} from '@angular/router';
import {MastersComponent} from './masters/masters.component';
import {AuthComponent} from './auth/auth.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: 'tasks', component: TasksComponent},
  {path: 'request', component: RequestComponent},
  {path: 'masters', component: MastersComponent},
  {path: 'login', component: AuthComponent},

//  {path: 'dashboard', component: DashboardComponent },
//  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//  {path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


