import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "src/app/shared/users.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  data = {
    role: "patient",
    name: "",
    email: "",
    password: "",
  };
  error: string | null;
  loading = false;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.loading = true;
    this.userService.addUser(this.data).subscribe({
      next: (user) => {
        this.authService.login(this.data.email, this.data.password).subscribe();
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
    });
  }
}
