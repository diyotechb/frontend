import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

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
export class CareersComponent {

  careers:Careers[];

  public constructor(private appService: AppService, private router: Router) {
  }

  ngOnInit() {
      this.appService.getAllJobs().subscribe((jobs: Careers[]) => {
        this.careers=jobs;
      })
  }

  apply() {
    this.router.navigate(['/apply']);
  }

}
