import { Injectable } from "@angular/core";
import { BehaviorSubject, of, tap } from "rxjs";
import jwt_decode from "jwt-decode";

import { ApiService } from "../shared/api.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<{
    _id: string;
    name: string;
    role: "doctor" | "patient";
  } | null>(null);
  token: string;

  constructor(private apiService: ApiService, private router: Router) {}

  login(email: string, password: string) {
    return this.apiService.post("login", { email, password }).pipe(
      tap(({ token }) => {
        this.token = token;
        localStorage.setItem("token", token);
        this.user.next(jwt_decode(token));
        this.router.navigate(["/app/appointments"]);
      })
    );
  }

  autoLogin() {
    const token = localStorage.getItem("token");
    if (token) {
      this.user.next(jwt_decode(token));
      this.token = token;
      return of(true);
    }

    return of(false);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("token");
    this.token = "";
    this.router.navigate(["/auth", "login"]);
  }
}
