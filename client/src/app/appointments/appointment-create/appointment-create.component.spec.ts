import { TestBed } from "@angular/core/testing";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";

import { AppointmentCreateComponent } from "./appointment-create.component";
import { AppointmentService } from "../appointment.service";
import { UsersService } from "src/app/shared/users.service";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { of } from "rxjs";

describe("AppointmentCreateComponent", () => {
  let component: AppointmentCreateComponent;
  let mockAppointmentService;
  let mockUserService;
  let mockDateParser;
  let mockRouter;

  let DOCTORS = [
    { _id: "1", name: "John Doe" },
    { _id: "2", name: "Jane Doe" },
    { _id: "3", name: "Mike Doe" },
  ];

  beforeEach(async () => {
    const appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['addAppointment'])
    const userServiceSpy = jasmine.createSpyObj('UsersService', ['getDoctors'])
    const dateParserSpy = jasmine.createSpyObj('NgbDateParserFormatter', ['parse'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      providers: [
        AppointmentCreateComponent,
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: UsersService, useValue: userServiceSpy },
        { provide: NgbDateParserFormatter, useValue: dateParserSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    mockDateParser = TestBed.inject(NgbDateParserFormatter);
    mockUserService = TestBed.inject(UsersService);
    mockAppointmentService = TestBed.inject(AppointmentService);
    mockRouter = TestBed.inject(Router);
    component = TestBed.inject(AppointmentCreateComponent);
  });

  describe("setBoundaries", () => {
    it("should call date parser with correct date ISO string", () => {
      let date = new Date(2030, 9, 1);
      mockDateParser.parse.and.returnValue({
        year: 2030,
        month: 10,
        day: 1,
      });

      component.setDateBoundaries(date);

      expect(mockDateParser.parse).toHaveBeenCalledWith(
        "2030-10-02T05:00:00.000Z"
      );
      expect(mockDateParser.parse).toHaveBeenCalledWith(
        "2030-12-02T06:00:00.000Z"
      );
    });

    it(`should set minDate to tomorrow's date`, () => {
      mockDateParser.parse.and.returnValue({
        year: 2030,
        month: 10,
        day: 1,
      });

      component.setDateBoundaries(new Date(2030, 9, 1));

      expect(component.minDate).toEqual({ year: 2030, month: 10, day: 1 });
    });

    it("should set maxDate to date one month away from tomorrow", () => {
      mockDateParser.parse.and.returnValue({
        year: 2030,
        month: 11,
        day: 2,
      });
      let date = new Date(2030, 9, 1);

      component.setDateBoundaries(date);

      expect(component.maxDate).toEqual({ year: 2030, month: 11, day: 2 });
    });
  });

  it("should set doctors correctly from service", () => {
    //arrange
    mockUserService.getDoctors.and.returnValue(of(DOCTORS));

    //act
    component.loadDoctors();

    //assert
    expect(component.doctors).toEqual(DOCTORS);
  });

  it("onSubmit should call addAppointment from service with arguments doctor id and timestamp", () => {
    let form = {
      date: { year: 2030, month: 9, day: 1 },
      doctor: "1",
      description: "Back problems",
      time: { hour: 1, minute: 20, second: 0 },
    };
    mockAppointmentService.addAppointment.and.returnValue(of({}));

    component.onSubmit(form);

    expect(mockAppointmentService.addAppointment).toHaveBeenCalledWith(
      jasmine.objectContaining({
        doctor: form.doctor,
        description: form.description,
        date: 1914474000000,
      })
    );
  });
});
