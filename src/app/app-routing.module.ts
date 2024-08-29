import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CategoryComponent } from './category/category.component';
import { DestinationComponent } from './destination/destination.component';
import { TripComponent } from './trip/trip.component';
import { userTripBookingComponent } from './user-trip-booking/user-trip-booking.component';
import { userBookedTripsComponent } from './user-booked-trips/user-booked-trips.component';
import { answerComponent } from './answer/answer.component';
import { questionComponent } from './question/question.component';
import { ReviewComponent } from './review/review.component';
import { EmailFormComponent } from './email-form/email-form.component';



const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'category', component: CategoryComponent},
{path: 'user', component: UserComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'login', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'registration', component: RegistrationComponent},
{path: 'destination', component: DestinationComponent},
{path: 'trip', component: TripComponent},
{path: 'bookings', component: userTripBookingComponent},
{path: 'bookings/user', component: userBookedTripsComponent},
{path: 'answer', component: answerComponent},
{path: 'question', component: questionComponent},
{path: 'review', component: ReviewComponent},
{path: 'email', component: EmailFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
