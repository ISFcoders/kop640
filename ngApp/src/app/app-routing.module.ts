import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { UserComponent } from "./user/user.component";
import { AdminComponent } from "./admin/admin.component";
import { OwnerComponent } from "./owner/owner.component";
import { EventsComponent } from "./events/events.component";
import { SpecialEventsComponent } from "./special-events/special-events.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent
  },
  {
    path: 'owner',
    canActivate: [AuthGuard],
    component: OwnerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
