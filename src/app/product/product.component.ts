import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  public products: Product[] = [];
  public editProduct: Product = new Product();
  public deleteProduct: Product = new Product();
  public addProduct: Product = new Product();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";

  constructor(private productService: ProductService){

  }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void {
    const container = document.getElementById('add-product-form');
     if(container != null)
          {container.click();}
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProducts(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  public onOpenModal(product: Product, mode: string): void {
    /*const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');*/
    if (mode === 'add') {
      //this.display = "block";
      //button.setAttribute('data-bs-target', '#addProductModal');
      this.display = "block";
    }
    if (mode === 'edit') {
      //this.editProduct = product;
      //button.setAttribute('data-bs-target', '#updateProductModal');
      this.display2 = "block";
    }
    if (mode === 'delete') {
      //this.deleteProduct = product;
      //button.setAttribute('data-bs-target', '#deleteProductModal');
      this.display3 = "block";
    }
    //if(container != null)
      //{container.appendChild(button);
      //}
    //button.click();
     //this.display = "block";

  }
/*
   public onOpenModal2(product: Product, mode: string): void {
     if (mode === 'edit') {
        this.display3 = "block";
   }

   public onOpenModal3(product: Product, mode: string): void {
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
