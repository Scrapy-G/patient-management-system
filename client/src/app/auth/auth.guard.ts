import { inject } from "@angular/core";
import {
  CanActivateFn,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.user.value) {
    return router.navigate(["/auth", "login"])
  }
  return true

};
