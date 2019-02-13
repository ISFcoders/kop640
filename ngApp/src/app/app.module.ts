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

import { ConfigAuthService } from "./services/config/config.auth.service";
import { ConfigEventService } from "./services/config/config.event.service";
import { ConfigMainService } from "./services/config/config.main.service";
import { ConfigOwnerService } from "./services/config/config.owner.service";
import { ConfigUserService } from "./services/config/config.user.service";
import { ConfigService } from "./services/config/config.service";
import { AuthService } from "./services/auth.service";
import { EventService } from "./services/event.service";
import { UserService } from "./services/user.service";
import { OwnerService } from "./services/owner.service";
import { EthcontractService } from "./services/ethcontract/ethcontract.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { MainService } from "./services/main.service";

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
  providers: [ConfigAuthService, ConfigEventService, ConfigMainService, ConfigOwnerService, ConfigUserService, ConfigService, AuthService, AuthGuard, EventService, UserService, OwnerService, EthcontractService, MainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
