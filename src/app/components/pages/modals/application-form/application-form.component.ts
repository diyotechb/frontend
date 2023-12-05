import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent  {
  applicationForm: FormGroup;


  uploadedResume: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ApplicationFormComponent>
  ) { }

  ngOnInit(): void {


    this.applicationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  submitApplication(form: any) {
    console.log("submitted")
    // Handle form submission logic here (e.g., sending data to a server)
    // if (form.valid) {
    //   console.log('Form submitted:', form.value);
    //   // You can send the form data to a server using a service here
    // } else {
    //   console.log('Form is invalid. Please fill out all required fields.');
    // }
  }
  // submitApplication(): void {
  //   if (this.applicationForm.valid) {
  //     // You can submit the form data and uploadedResume here
  //     // For example, you can send it to a backend API
  //     console.log('Form Data:', this.applicationForm.value);
  //     console.log('Uploaded Resume:', this.uploadedResume);

  //     // Close the dialog
  //     this.dialogRef.close();
  //   }
  // }

  onFileAdded(event: File): void {
    this.uploadedResume = event;
  }

  onSelect($event){
    console.log("$event")
  }
}
