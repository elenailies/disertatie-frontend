import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailDetails = { to: '', subject: '', text: '' };
  message: string | null = null;

  constructor(private emailService: EmailService) { }

  sendEmail() {
    this.emailService.sendEmail(this.emailDetails).subscribe(
      (response: any) => {
        this.message = response.message;  // Access the message property from the JSON response
      },
      (error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        this.message = 'Error sending email. Please check console for details.';
      }
    );
  }


}
