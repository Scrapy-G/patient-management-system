import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentCreateComponent } from "./appointment-create/appointment-create.component";
import { SharedModule } from "../shared/shared.module";
import { AppointmentItemComponent } from "./appointment-item/appointment-item.component";
import { FormsModule } from "@angular/forms";
import { AppointmentSuccessComponent } from './appointment-success/appointment-success.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentCreateComponent,
    AppointmentItemComponent,
    AppointmentSuccessComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentsRoutingModule,
    NgbDatepickerModule,
    NgSelectModule,
    NgbTimepickerModule,
    SharedModule,
  ],
})
export class AppointmentsModule {}
