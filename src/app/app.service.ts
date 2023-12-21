import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = environment.url;
  
  public constructor(private http:HttpClient) {
  }

  getAllJobs(): Observable<any>{
    return this.http.get(this.url + "/api/jobPosting/all");
  }

  applyJob(formData:FormData){
    return this.http.post(this.url + "/api/jobApplication/applyJob", formData);
  }
}
