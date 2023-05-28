import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private apiService: ApiService) {}

  getAppointments(params = {}) {
    return this.apiService.get("appointments", { params });
  }

  addAppointment(data = {}) {
    return this.apiService.post("appointments", data);
  }

  acceptAppointment(id: string) {
    return this.apiService.get(`appointments/${id}/accept`);
  }

  declineAppointment(id: string) {
    return this.apiService.get(`appointments/${id}/decline`);
  }
}
