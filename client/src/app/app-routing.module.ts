import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./core/layout/layout.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ForbiddenComponent } from "./core/forbidden/forbidden.component";
import { PatientGuard } from "./shared/patient.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "app",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "appointments",
        loadChildren: () =>
          import("./appointments/appointments.module").then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: "profile",
        component: ProfileEditComponent,
        canActivate: [PatientGuard],
      },
      { path: "**", redirectTo: "/app/appointments" },
    ],
  },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "**", redirectTo: "/app/appointments" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
