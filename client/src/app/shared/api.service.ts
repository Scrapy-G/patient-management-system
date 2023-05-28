import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  get(route: string, params = {}): Observable<any> {
    return this.httpClient.get(this.apiUrl + route, params);
  }

  post(route: string, params = {}): Observable<any> {
    return this.httpClient.post(this.apiUrl + route, params);
  }

  put(route: string, params = {}) {
    return this.httpClient.put(this.apiUrl + route, params);
  }

  delete(route: string) {
    return this.httpClient.delete(this.apiUrl + route);
  }
}
