import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'http://localhost:5000/api/users/applyJob'
  
  public constructor(private http:HttpClient) {
  }
  getJSONData(): Observable<any>{
    return this.http.get('assets/data/jobDetails.json');
  }

  applyJob(formData:FormData){
    console.log("in app service", formData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    return this.http.post(this.url, formData, {headers});
  }
}
