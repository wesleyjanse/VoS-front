import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LivestreamComponent } from './components/livestream/livestream/livestream.component';
import { ViolationComponent } from './components/violation/violation/violation.component';
import { MembersComponent } from './components/members/members/members.component';
import { LoginComponent } from './security/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'livestream', component: LivestreamComponent},
  { path: 'violations', component: ViolationComponent},
  { path: 'members', component: MembersComponent},
  { path: 'login', component: LoginComponent, outlet: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
