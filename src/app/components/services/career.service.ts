import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  public constructor(private http:HttpClient) {
  }
  getJSONData(): Observable<any>{
    return this.http.get('./jobDetails.json');
  }
}
