import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  
  public constructor(private http:HttpClient) {
  }
  getJSONData(): Observable<any>{
    return this.http.get('assets/data/jobDetails.json');
  }
}
