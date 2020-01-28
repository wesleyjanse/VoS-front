import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LivestreamComponent } from './components/livestream/livestream/livestream.component';
import { ViolationComponent } from './components/violation/violation/violation.component';
import { MembersComponent } from './components/members/members/members.component';
import { LoginComponent } from './security/login/login.component';
import { EditMemberComponent } from './components/members/edit-member/edit-member.component';


const routes: Routes = [
  //Login Outlet
  { path: 'login', component: LoginComponent, outlet: "login"},

  //Main Outlet
  //Main Routes
  { path: 'home', component: HomeComponent },
  { path: 'livestream', component: LivestreamComponent},
  { path: 'violations', component: ViolationComponent},

  //Members & Employees
  { path: 'members', component: MembersComponent},
  { path: 'members/:id/edit', component: EditMemberComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
