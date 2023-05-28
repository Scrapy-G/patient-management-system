import { Component } from "@angular/core";

@Component({
  selector: "app-forbidden",
  template: `<div class="container my-5 text-center">
    <h1 class="font-weight-light">403</h1>
    <p>Forbidden</p>
    <p class="text-muted">You are not allowed to access this route</p>
    <a class="mt-5 btn btn-outline-primary" routerLink="/app">Home</a>
  </div>`
})
export class ForbiddenComponent {}
