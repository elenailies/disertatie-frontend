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
        this.message = 'Email sent successfully!';
      },
      (error: HttpErrorResponse) => {
        this.message = 'Error sending email.';
      }
    );
  }
}
