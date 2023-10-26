import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
{path: 'product', component: ProductComponent},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'login', component: LoginComponent},
{path: 'user', component: UserComponent},
{path: 'contact', component: ContactComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
