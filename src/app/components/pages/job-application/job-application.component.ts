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
  resumeFile: String | null = null;
  resumeFileName:  string = '';
  applicationForm: FormGroup;
  isSubmitting: boolean = false;

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
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const base64Data = e.target.result as string;
        this.resumeFile = base64Data;
        this.resumeFileName = selectedFile?.name || '';
    };

    reader.readAsDataURL(selectedFile);
  }

  submitApplication() {
    if(this.applicationForm.invalid || !this.resumeFile ){
      const message = 'Fill all the required fields';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
      return;
    }

    const formData ={
      firstName:this.applicationForm.value.firstName,
      middleName:this.applicationForm.value.middleName,
      lastName:this.applicationForm.value.lastName,
      email: this.applicationForm.value.applicantEmail,
      phoneNumber:this.applicationForm.value.phoneNumber,
      resumeUrl:this.resumeFile
    }

    this.isSubmitting = true;
    this.appService.applyJob(formData)
      .subscribe(
        (response) => {
          const message = "Application Submitted Successfully"; 
          this.applicationForm.reset();
          this.resumeFile = null;
          this.resumeFileName = '';
          this.isSubmitting = false;
          this.message = message;      
        },
        (error) => {
          const message = 'Error Submitting Application';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
          });
          this.isSubmitting = false;
        },
      );
  }
}
