import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'shop';

  navigateToAnotherComponent() {
   this.router.navigate(['/shopping-cart']);
   alert("You clicked on the button, so it triggered the alert box");
  }

  navigateToAnotherComponent2() {
    this.router.navigate(['/products']);
    alert("You clicked on the button, so it triggered the alert box");
   }
}


