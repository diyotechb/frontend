import { Component } from '@angular/core';
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

  public constructor(private appService: AppService) {
  }

  ngOnInit() {
      this.appService.getJSONData().subscribe((jobs: Careers[]) => {
        this.careers=jobs;
        console.log(this.careers)
      })
  }

}
