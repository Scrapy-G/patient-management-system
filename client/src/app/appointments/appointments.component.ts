import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";

import { AppointmentService } from "./appointment.service";
import { Appointment } from "../models";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit {
  category: "upcoming" | "history" | "requests" = "upcoming";
  appointments: Appointment[];
  loading = false;
  
  user: any;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAppointments({ category: this.category });
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.user = user!;
    });
  }

  loadAppointments(params = {}) {
    this.loading = true;
    this.appointmentService.getAppointments(params).subscribe((appointments) => {
      this.appointments = appointments;
      this.loading = false;
    });
  }

  onAppointmentAccept(apnt: Appointment) {
    this.appointmentService.acceptAppointment(apnt._id).subscribe();
    apnt.status = "accepted";
  }

  onAppointmentDecline(apnt: Appointment) {
    this.appointmentService.declineAppointment(apnt._id).subscribe();
    apnt.status = "declined";
  }

  onCategoryChange() {
    this.loadAppointments({ category: this.category })
  }
}
