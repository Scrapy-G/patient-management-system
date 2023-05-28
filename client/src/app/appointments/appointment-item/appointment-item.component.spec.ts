import { Appointment } from "src/app/models";
import { AppointmentItemComponent } from "./appointment-item.component";

describe('AppointmentItemComponent', () => {
    let component: AppointmentItemComponent;
    let APPOINTMENT: Appointment;

    beforeEach(() => {
        APPOINTMENT = {
            _id: "1",
            date: "2030-12-02T06:00:00.000Z",
            doctor: {
                _id: "1",
                name: "John Doe"
            },
            patient: {
                _id: "2",
                name: "Jane James"
            },
            description: "Back problems",
            status: "accepted"
        }
        component = new AppointmentItemComponent();
    })

    it('should set date and time strings correctly from appointment date', () => {
        component.appointment = APPOINTMENT;

        component.ngOnInit();

        expect(component.dateStr).toEqual("Mon, Dec 2, 2030");
        expect(component.timeStr).toEqual("12:00 AM");
    })
})