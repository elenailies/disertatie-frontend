import { Component } from '@angular/core';

import { Review } from '../review';
import { ReviewService } from '../review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{

  public reviews: Review[] = [];
  public editReview: Review = new Review();
  public deleteReview: Review = new Review();
  public addReview: Review = new Review();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public loggedUser: User = new User();

  public selectedReviewId: number = 0;
  public totalRating: number = 0;

  //public userIdToFind: number = 0;


  constructor(private reviewService: ReviewService, private localStorage: LocalStorage){

     this.getLoggedUser();

  }

getTotalRating(): number {
    const totalReviews = this.reviews.length;
      if (totalReviews === 0) {
        return 0;
      }
      const totalRating = this.reviews.reduce((total, review) => total + review.rating, 0);
      return totalRating / totalReviews;
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
    this.getReviews();
    //this.totalRating = this.getTotalRating();
  }

  public getReviews(): void {
    this.reviewService.getReviews().subscribe(
      (response: Review[]) => {
        this.reviews = response;
        console.log(this.reviews);
        this.totalRating = this.getTotalRating();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddReview(addForm: NgForm): void {
    const container = document.getElementById('add-review-form');

     if(container != null)
          {container.click();}
    this.reviewService.addReview(addForm.value).subscribe(
      (response: Review) => {
        console.log(response);
        this.getReviews();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateReview(review: Review): void {
    this.reviewService.updateReview(review).subscribe(
      (response: Review) => {
        console.log(response);
        this.getReviews();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      (response: void) => {
        console.log(response);
        this.getReviews();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchReviews(key: string): void {
    console.log(key);
    const results: Review[] = [];
    for (const review of this.reviews) {
      if (review.content.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(review);
      }
    }
    this.reviews = results;
    if (results.length === 0 || !key) {
      this.getReviews();
    }
  }

  public onOpenModal(review: Review, mode: string): void {

    if (mode === 'add') {
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editReview = review;
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteReview = review;
      this.display3 = "block";
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

}
