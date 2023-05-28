import { BehaviorSubject, of } from "rxjs";

import { AppointmentsComponent } from "./appointments.component";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "../auth/auth.service";
import { AppointmentService } from "./appointment.service";
import { Appointment } from "../models";

class MockAuthService {
  user;
}

describe("AppointmentsComponent", () => {
  let component: AppointmentsComponent;
  let mockAppointmentService;
  let mockAuthService;

  let APPOINTMENTS: Appointment[] = [
    {
      _id: "1",
      date: "2030-12-02T06:00:00.000Z",
      doctor: {
        _id: "1",
        name: "John Doe",
      },
      patient: {
        _id: "2",
        name: "Jane James",
      },
      description: "Back problems",
      status: "declined",
    },
    {
      _id: "2",
      date: "2030-06-02T06:00:00.000Z",
      doctor: {
        _id: "3",
        name: "Ethan Doe",
      },
      patient: {
        _id: "4",
        name: "Bale James",
      },
      description: "Headache",
      status: "accepted",
    },
    {
      _id: "3",
      date: "2030-02-02T06:00:00.000Z",
      doctor: {
        _id: "5",
        name: "Michael Doe",
      },
      patient: {
        _id: "6",
        name: "Michelle James",
      },
      description: "Back pain",
      status: "pending",
    },
  ];

  beforeEach(() => {
    const appointmentServiceSpy = jasmine.createSpyObj("AppointmentService", [
      "getAppointments",
      "acceptAppointment",
      "declineAppointment",
    ]);

    TestBed.configureTestingModule({
      providers: [
        AppointmentsComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
      ],
    });

    component = TestBed.inject(AppointmentsComponent);
    mockAppointmentService = TestBed.inject(AppointmentService);
    mockAuthService = TestBed.inject(AuthService);
  });

  it("should set appointments correctly from service", () => {
    mockAppointmentService.getAppointments.and.returnValue(of(APPOINTMENTS));

    component.loadAppointments();

    expect(component.appointments).toHaveSize(APPOINTMENTS.length);
  });

  describe("onAppointmentAccept", () => {
    it("should call acceptAppointment from service with appointment id as argument", () => {
      mockAppointmentService.acceptAppointment.and.returnValue(of({}));

      component.onAppointmentAccept(APPOINTMENTS[0]);

      expect(mockAppointmentService.acceptAppointment).toHaveBeenCalledOnceWith(
        APPOINTMENTS[0]._id
      );
    });

    it(`should set appointment status to 'accept'`, () => {
      mockAppointmentService.acceptAppointment.and.returnValue(of({}));

      component.onAppointmentAccept(APPOINTMENTS[0]);

      expect(APPOINTMENTS[0].status).toEqual("accepted");
    });
  });

  describe("onAppointmentDecline", () => {
    it("should call declineAppointment from service with appointment id as argument", () => {
      mockAppointmentService.declineAppointment.and.returnValue(of({}));

      component.onAppointmentDecline(APPOINTMENTS[0]);

      expect(
        mockAppointmentService.declineAppointment
      ).toHaveBeenCalledOnceWith(APPOINTMENTS[0]._id);
    });

    it(`should set appointment status to 'decline'`, () => {
      mockAppointmentService.declineAppointment.and.returnValue(of({}));

      component.onAppointmentDecline(APPOINTMENTS[0]);

      expect(APPOINTMENTS[0].status).toEqual("declined");
    });
  });
});
