
import {Component, OnInit} from '@angular/core';

import {Careers} from "./careers.model";
import {CareerService} from "../../services/career.service";

@Component({
    selector: 'app-careers',
    templateUrl: './careers.component.html',
    styleUrls:['./careers.component.css']
})
export class CareersComponent implements OnInit{

    careers:Careers[];

    public constructor(private careerService: CareerService) {
    }

    ngOnInit() {
        // for(let i=0; i<jsonData.careers.length; i++){
        //     let career = new Careers(jsonData.careers[i].jobId,jsonData.careers[i].title
        //         ,jsonData.careers[i].description,jsonData.careers[i].location, jsonData.careers[i].requirements, jsonData.careers[i].instructions);
        //     this.careers.push(career);
        //     console.log(career);
        // }
        this.careerService.getJSONData().subscribe((jobs: any) => {
            console.log(jobs);
        })
    }
}