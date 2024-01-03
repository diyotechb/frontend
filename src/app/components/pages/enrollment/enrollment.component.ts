import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit{

  message: string = '';
  resumeFileName: string = '';
  resumeDoc: String | null = null;
  licenseFileName: string = '';
  licenseDoc: String | null = null;
  enrollmentForm: FormGroup;

  constructor(private appService:AppService, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.enrollmentForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)]],
      emailAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9- ]+$')]],
      currentAddress: ['', Validators.required],
      hasDriverLicense: [false],
      visaStatus: ['', Validators.required],
      education: ['', Validators.required],
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      completionDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)]],
      referral: [''],
      trainingPreference: [''],
    });
  }

  ngOnInit(): void {  }

  onFileSelected(event: any, documentType: string) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const base64Data = e.target.result as string;

        if (documentType === 'resume') {
            this.resumeDoc = base64Data;
            this.resumeFileName = selectedFile?.name || '';
        } else if (documentType === 'license') {
            this.licenseDoc = base64Data;    
            this.licenseFileName = selectedFile?.name || '';
        }
    };

    reader.readAsDataURL(selectedFile);
  }

  onDriverLicenseCheckboxChange(event: any) {
    const isChecked = event.target.checked;

    if (!isChecked) {
        this.licenseDoc = '';
    }
}

  submitEnrollment(){

    if (this.enrollmentForm.invalid) {
      const message = 'Fill all the required fields';
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
      return;
    }

    const enrollmentsData = {
      fullName: this.enrollmentForm.value.fullName,
      dateOfBirth: this.enrollmentForm.value.dateOfBirth,
      emailAddress: this.enrollmentForm.value.emailAddress,
      phoneNumber: this.enrollmentForm.value.phoneNumber,
      currentAddress: this.enrollmentForm.value.currentAddress,
      hasDriverLicense: this.enrollmentForm.value.hasDriverLicense,
      visaStatus: this.enrollmentForm.value.visaStatus,
      education: this.enrollmentForm.value.education,
      degree: this.enrollmentForm.value.degree,
      institution: this.enrollmentForm.value.institution, 
      completionDate: this.enrollmentForm.value.completionDate,
      referral: this.enrollmentForm.value.referral,
      trainingPreference: "JAVA",
      applicationStatus: "APPLICATION_STARTED",
      resumeDoc:this.resumeDoc,
      licenseDoc:this.licenseDoc
    };

    this.appService.enroll(enrollmentsData)
    .subscribe(
      (response) => {
        const message = 'Thank you for your enrollment. You will be contacted soon.';
        this.enrollmentForm.reset();

        this.resumeDoc = null;
        this.licenseDoc = null;
        this.resumeFileName ='';
        this.licenseFileName ='';
        this.message = message;
      },
      (error) => {
        const message = 'Error Submitting Application. Please try again later.';
        this.snackBar.open(message, 'Close', {
          duration: 3000,
        });
      },
    );

  }
}
