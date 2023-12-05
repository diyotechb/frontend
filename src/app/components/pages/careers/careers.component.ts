import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog'; 
import { ApplicationFormComponent } from '../modals/application-form/application-form.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

export interface Careers{
     jobId: string;
     title: string;
     location: string;
     description: string;
     requirements: string;
     instructions: string;
}
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;

  careers:Careers[];

  public constructor(private appService: AppService, private dialog: MatDialog, private modalservice:NgbModal, private router:Router) {
  }

  ngOnInit() {
      this.appService.getJSONData().subscribe((jobs: Careers[]) => {
        this.careers=jobs;
      })
  }

  applyJob(id:any){

  }

  openApplicationDialog() {
    // Open the application form dialog
   const dialogRef = this.dialog.open(ApplicationFormComponent, {
    width: '60%',
    height:'400px'
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('Modal closed with result:', result);
  });
  }

  onClick(){
    this.router.navigate(['/application'])
  }

  // openModal() {
  //   this.myModal.nativeElement.style.display = 'block';
  // }
  // closeModal() {
  //   this.myModal.nativeElement.style.display = 'none';
  // }


}
