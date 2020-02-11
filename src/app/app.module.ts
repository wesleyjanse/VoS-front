import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './components/home/home.module';
import { MatSidenavModule, MatIconModule, MatBadgeModule, MatListModule, MatButtonModule, MatToolbarModule,MatMenuModule } from '@angular/material'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { LivestreamModule } from './components/livestream/livestream.module';
import { ViolationModule } from './components/violation/violation.module';
import { MembersModule } from './components/members/members.module';
import { SecurityModule } from './security/security.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ToastModule, ToastService } from './toast';
import { LogsModule } from './components/logfiles/logs.module';
import { ReportingModule } from './components/reporting/reporting.module';
import { CamerasModule } from './components/cameras/cameras.module';
import { SettingsModule } from './components/settings/settings.module';
import { NotificationService } from './core/services/notification.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HomeModule,
    MatSidenavModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
    AngularSvgIconModule,
    LivestreamModule,
    ViolationModule,
    MatToolbarModule,
    MatMenuModule,
    MembersModule,
    LogsModule,
    SecurityModule,
    ReportingModule,
    CamerasModule,
    SettingsModule,
    MatDialogModule,
    ToastModule.forRoot()
  ],
  providers: [
    ToastService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
