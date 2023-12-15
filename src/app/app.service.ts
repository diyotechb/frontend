import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = environment.prodURL;
  
  public constructor(private http:HttpClient) {
  }

  getAllJobs(): Observable<any>{
    return this.http.get(this.url + "/api/jobs/all");
  }

  applyJob(formData:FormData){
    return this.http.post(this.url + "/api/users/applyJob", formData);
  }
}
