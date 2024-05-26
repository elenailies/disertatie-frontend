import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'user', component: UserComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'login', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
