import { Component } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  public categories: Category[] = [];
  public editCategory: Category = new Category();
  public deleteCategory: Category = new Category();
  public addCategory: Category = new Category();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public loggedUser: User = new User();

  public selectedCategoryId: number = 0;

  //public userIdToFind: number = 0;


  constructor(private categoryService: CategoryService, private localStorage: LocalStorage){

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
    this.getCategories();
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddCategory(addForm: NgForm): void {
    const container = document.getElementById('add-category-form');

     if(container != null)
          {container.click();}
    this.categoryService.addCategory(addForm.value).subscribe(
      (response: Category) => {
        console.log(response);
        this.getCategories();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateCategory(category: Category): void {
    this.categoryService.updateCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this.getCategories();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategories();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCategories(key: string): void {
    console.log(key);
    const results: Category[] = [];
    for (const category of this.categories) {
      if (category.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(category);
      }
    }
    this.categories = results;
    if (results.length === 0 || !key) {
      this.getCategories();
    }
  }

  public onOpenModal(category: Category, mode: string): void {
    /*const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');*/
    if (mode === 'add') {
      //this.display = "block";
      //button.setAttribute('data-bs-target', '#addCategoryModal');
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editCategory = category;
      //button.setAttribute('data-bs-target', '#updateCategoryModal');
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteCategory = category;
      //button.setAttribute('data-bs-target', '#deleteCategoryModal');
      this.display3 = "block";
    }
    //if(container != null)
      //{container.appendChild(button);
      //}
    //button.click();
     //this.display = "block";

  }
/*
   public onOpenModal2(category: Category, mode: string): void {
     if (mode === 'edit') {
        this.display3 = "block";
   }

   public onOpenModal3(category: Category, mode: string): void {
     if (mode === 'delete') {
        this.display3 = "block";
   }
*/
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
