import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {

  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  applicantEmail: string = '';
  phoneNumber: string = '';
  selectedFileName: string = '';
  message: string = '';
  selectedFile: File | null = null;

  constructor(private appService:AppService, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
   
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  @ViewChild('applicationForm') applicationForm: NgForm;

  submitApplication() {
    const formData = new FormData();
    formData.append('firstName', this.firstName);
    formData.append('middleName', this.middleName);
    formData.append('lastName', this.lastName);
    formData.append('email', this.applicantEmail);
    formData.append('phoneNumber', this.phoneNumber);

    if (this.selectedFile) {
      formData.append('resume', this.selectedFile);
    }

    this.appService.applyJob(formData)
      .subscribe(
        (response) => {
          const message = "Application Submitted Successfully"; 
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
          this.applicationForm.resetForm();
          this.message = message;
        },
        (error) => {
          const message = 'Error Submitting Application';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
        },
      );
  }
  


}
