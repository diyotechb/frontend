import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {

  message: string = '';
  selectedFileName: string = '';
  selectedFile: File | null = null;
  applicationForm: FormGroup;

  constructor(private appService:AppService, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      applicantEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9- ]+$')]],
    });
  }
  
  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  submitApplication() {
    if(this.applicationForm.invalid){
      const message = 'Fill all the required fields';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
      return;
    }

    if(!this.selectedFile){
      const message = 'Resume is required';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
      return;
    }
    const formData = new FormData();
    formData.append('firstName', this.applicationForm.value.firstName);
    formData.append('middleName', this.applicationForm.value.middleName);
    formData.append('lastName', this.applicationForm.value.lastName);
    formData.append('email', this.applicationForm.value.applicantEmail);
    formData.append('phoneNumber', this.applicationForm.value.phoneNumber);
    formData.append('resume', this.selectedFile);

    this.appService.applyJob(formData)
      .subscribe(
        (response) => {
          const message = "Application Submitted Successfully"; 
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
          this.applicationForm.reset();
          this.selectedFile = null;
          this.selectedFileName = '';

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
