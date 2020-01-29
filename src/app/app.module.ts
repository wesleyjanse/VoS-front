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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
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
    SecurityModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
