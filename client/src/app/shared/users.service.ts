import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getUsers(params = {}) {
    return this.apiService.get("users", {params});
  }

  addUser(data: any) {
    return this.apiService.post("users", data);
  }

  getMe() {
    return this.apiService.get("users/me");
  }

  getDoctors() {
    return this.apiService.get("users", { params: { role: "doctor" }});
  }

  updateMe(data = {}) {
    return this.apiService.put("users/me", data);
  }

  deleteMyAccount() {
    return this.apiService.delete("users/me");
  }

}
