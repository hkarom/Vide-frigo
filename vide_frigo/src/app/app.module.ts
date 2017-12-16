import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { CommonService } from './services/common.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
//import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    AppRoutingModule,
    //MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user.token');
        },
        whitelistedDomains: ['localhost:3000'],
        skipWhenExpired: true
      }
    }),
    MalihuScrollbarModule.forRoot()
  ],
  providers: [AuthService, CommonService, AuthGuard, LoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
