import { Component } from '@angular/core';

import { Trip } from '../trip';
import { Program } from '../program';
import { TripService } from '../trip.service';
import { ProgramService } from '../program.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{

  public trips: Trip[] = [];
  public editTrip: Trip = new Trip();
  public deleteTrip: Trip = new Trip();
  public addTrip: Trip = new Trip();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public display4: String = "none";
  public loggedUser: User = new User();

  public selectedTripId: number = 0;

  //public userIdToFind: number = 0;

  public programs: Program[] = [];
  public editProgram: Program = new Program();
  public deleteProgram: Program = new Program();
  public addProgram: Program = new Program();
  public viewTrip: Trip = new Trip();
  public destinations: Destination[] = [];

  public selectedProgramId: number = 0;


  constructor(private tripService: TripService, private programService: ProgramService, private destinationService: DestinationService, private localStorage: LocalStorage){

     this.getLoggedUser();

  }

  getLoggedUser() {
      this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        //this.loggedUser.role='USER';
        console.log('Logged user:', this.loggedUser);
        //this.userIdToFind = this.loggedUser.id;
      });

  }

  ngOnInit() {
    this.getTrips();
    this.getPrograms();
    this.getDestinations();
  }

 public getDestinations(): void {
    this.destinationService.getDestinations().subscribe(
      (response: Destination[]) => {
        this.destinations = response;
        console.log(this.destinations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTrips(): void {
    this.tripService.getTrips().subscribe(
      (response: Trip[]) => {
        this.trips = response;
        console.log(this.trips);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddTrip(addForm: NgForm): void {
    const container = document.getElementById('add-trip-form');

     if(container != null)
          {container.click();}
    this.tripService.addTrip(addForm.value).subscribe(
      (response: Trip) => {
        console.log(response);
        this.getTrips();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateTrip(trip: Trip): void {
    this.tripService.updateTrip(trip).subscribe(
      (response: Trip) => {
        console.log(response);
        this.getTrips();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTrip(tripId: number): void {
    this.tripService.deleteTrip(tripId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTrips();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTrips(key: string): void {
    console.log(key);
    const results: Trip[] = [];
    for (const trip of this.trips) {
      if (trip.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(trip);
      }
    }
    this.trips = results;
    if (results.length === 0 || !key) {
      this.getTrips();
    }
  }

  public onOpenModal(trip: Trip, mode: string): void {
    if (mode === 'add') {
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editTrip = trip;
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteTrip = trip;
      this.display3 = "block";
    }
  }

  public onOpenModal2(trip: Trip, program: Program, mode: string): void {

     if (mode === 'add') {
       this.viewTrip = trip;
       this.display4 = "block";
     }

  }

   onCloseHandled() {
      this.display = "none";
    }

   onCloseHandled2() {
      this.display2 = "none";
   }

   onCloseHandled3() {
      this.display3 = "none";
   }

   onCloseHandled4() {
      this.display4 = "none";
   }

    public getPrograms(): void {
       this.programService.getPrograms().subscribe(
         (response: Program[]) => {
           this.programs = response;
           console.log(this.programs);
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
     }


     public onAddProgram(addForm2: NgForm): void {
       const container = document.getElementById('add-program-form');

        if(container != null)
             {container.click();}
       this.programService.addProgram(addForm2.value).subscribe(
         (response: Program) => {
           console.log(response);
           this.getPrograms();
           //addForm2.reset();
           this.onCloseHandled4();
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
           //addForm2.reset();
         }
       );
     }


     public onUpdateProgram(program: Program): void {
       this.programService.updateProgram(program).subscribe(
         (response: Program) => {
           console.log(response);
           this.getPrograms();
           this.onCloseHandled2();
          // console.log("update se acceseaza");
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
     }

     public onDeleteProgram(programId: number): void {
       this.programService.deleteProgram(programId).subscribe(
         (response: void) => {
           console.log(response);
           this.getPrograms();
           this.onCloseHandled3();
           //console.log("delete se acceseaza");
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
     }

     /*public searchPrograms(key: string): void {
       console.log(key);
       const results: Program[] = [];
       for (const program of this.programs) {
         if (program.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
           results.push(program);
         }
       }
       this.programs = results;
       if (results.length === 0 || !key) {
         this.getPrograms();
       }
     }*/

}
