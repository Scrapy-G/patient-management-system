import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { AppointmentSuccessComponent } from './appointment-success/appointment-success.component';
import { PatientGuard } from '../shared/patient.guard';

const routes: Routes = [
  { path: '', component: AppointmentsComponent },
  { path: 'create', component: AppointmentCreateComponent, canActivate: [PatientGuard] },
  { path: 'success', component: AppointmentSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
