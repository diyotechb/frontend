import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {

  fullName: string = '';
  applicantEmail: string = '';
  phoneNumber: string = '';
  selectedFile: File | null = null;

  constructor(private appService:AppService, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
   
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


    submitApplication() {
      const formData = new FormData();
      formData.append('fullName', this.fullName);
      formData.append('email', this.applicantEmail);
      formData.append('phoneNumber', this.phoneNumber);
      if (this.selectedFile) {
        formData.append('resume', this.selectedFile, this.selectedFile.name);
      }
  
      this.appService.applyJob( formData)
        .subscribe(
          (response) => {
            this.snackBar.open('Application submitted successfully', 'Close', {
              duration: 3000,
            });
            // Add any further handling or redirection logic here
          },
          (error) => {
            this.snackBar.open('Error submitting application', 'Close', {
              duration: 3000,
            });
            console.error('Error submitting application', error);
            // Handle errors here
          }
        );
    }
  


}
