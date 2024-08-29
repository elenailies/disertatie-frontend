import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

import { HttpClientModule } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { CategoryComponent } from './category/category.component';
import { DestinationComponent } from './destination/destination.component';
import { TripComponent } from './trip/trip.component';
//import { UserTripDetailsComponent } from './user-trip-details/user-trip-details.component';
import { userTripBookingComponent } from './user-trip-booking/user-trip-booking.component';
import { userBookedTripsComponent } from './user-booked-trips/user-booked-trips.component';
import { questionComponent } from './question/question.component';
import { answerComponent } from './answer/answer.component';
import { ReviewComponent } from './review/review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailFormComponent } from './email-form/email-form.component';
//import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    CategoryComponent,
    DestinationComponent,
    TripComponent,
   // UserTripDetailsComponent,
    userTripBookingComponent,
    userBookedTripsComponent,
    questionComponent,
    answerComponent,
    ReviewComponent,
    EmailFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
