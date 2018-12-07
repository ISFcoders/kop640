import { AuthGuard } from "./auth.guard";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";
import { EventService } from "./event.service";
import { UserService } from "./user.service";
import { OwnerService } from "./owner.service";
import { EthcontractService } from "./ethcontract.service";
import { TokenInterceptorService } from "./token-interceptor.service";
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    MainComponent,
    UserComponent,
    AdminComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, EventService, UserService, OwnerService, EthcontractService, ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
