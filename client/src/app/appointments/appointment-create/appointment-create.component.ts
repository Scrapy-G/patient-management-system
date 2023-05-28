import { Component, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbTimeStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { UsersService } from "src/app/shared/users.service";
import { AppointmentService } from "../appointment.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-appointment-create",
  templateUrl: "./appointment-create.component.html",
})
export class AppointmentCreateComponent implements OnInit {
  calendarModel: NgbDateStruct;
  doctors: any[];

  minDate: NgbDateStruct;
  maxDate: { year: number; month: number; day: number };

  selectedDate: NgbDateStruct;
  selectedTime: NgbTimeStruct;
  selectedDoctor: string;

  form: {
    date: NgbDateStruct | null;
    time: NgbTimeStruct | null;
    description: string;
    doctor: string;
  } = {
    date: null,
    time: null,
    description: "",
    doctor: "",
  };

  loading = false;
  error: string | null;

  constructor(
    private appointmentService: AppointmentService,
    private userService: UsersService,
    private dateParser: NgbDateParserFormatter,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.setDateBoundaries(new Date());
  }

  loadDoctors() {
    this.loading = true;
    this.userService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.loading = false;
    });
  }

  setDateBoundaries(currentDate: Date) {
    //set date boundary
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
    const oneMonthAhead = new Date(
      currentDate.setMonth(currentDate.getMonth() + 2)
    );

    this.minDate = this.dateParser.parse(tomorrow.toISOString())!;
    this.maxDate = this.dateParser.parse(oneMonthAhead.toISOString())!;
  }

  onSubmit(form: any) {
    this.loading = true;
    this.error = null;

    let date = form.date;
    let time = form.time;
    date = new Date(
      date.year,
      date.month - 1,
      date.day,
      time.hour,
      time.minute
    ).getTime();

    this.appointmentService
      .addAppointment({ doctor: form.doctor, date, description: form.description })
      .subscribe({
        next: (appointment) => {
          console.log("appointment success", appointment);
          this.loading = false;
          this.router.navigate(["/app", "appointments", "success"]);
        },
        error: (err) => {
          this.error = err.error;
          this.loading = false;
        },
      });
  }

  get formComplete() {
    return this.form.date && this.form.time && this.form.doctor;
  }
}
