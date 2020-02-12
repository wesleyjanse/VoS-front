import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LivestreamComponent } from './components/livestream/livestream/livestream.component';
import { ViolationComponent } from './components/violation/violation/violation.component';
import { MembersComponent } from './components/members/members/members.component';
import { LoginComponent } from './security/login/login.component';
import { LogsComponent } from './components/logfiles/logs/logs.component';
import { CamerasComponent } from './components/cameras/cameras/cameras.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { ReceptionComponent } from './components/reception/reception/reception.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ReceptionGuard } from './core/guards/reception.guard';


const routes: Routes = [
  //Login Outlet
  { path: 'login', component: LoginComponent, outlet: "login"},

  //Main Outlet
  //Main Routes
  { path: 'reception', component: ReceptionComponent, canActivate: [ReceptionGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'livestream', component: LivestreamComponent, canActivate: [AdminGuard ]},
  { path: 'violations', component: ViolationComponent, canActivate: [AdminGuard]},
  { path: 'logs', component: LogsComponent, canActivate: [AdminGuard]},
  { path: 'cameras', component: CamerasComponent, canActivate: [AdminGuard]},

  //Members & Employees
  { path: 'members', component: MembersComponent, canActivate: [AdminGuard]},

  //Settings
  { path: 'settings', component: SettingsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
