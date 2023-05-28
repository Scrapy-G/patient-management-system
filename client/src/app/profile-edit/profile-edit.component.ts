import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from '../shared/users.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.scss"],
})
export class ProfileEditComponent implements OnInit {
  user = {
    name: "",
    gender: "",
    age: 40,
    address: "",
  };

  loading = false;
  error: string | null;
  success: boolean;

  isAccountDeleted: boolean;

  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadMyProfile();
  }

  loadMyProfile() {
    this.loading = true;
    this.userService.getMe().subscribe((user) => {
      this.user = {
        name: user.name,
        gender: user.gender,
        age: user.age,
        address: user.address,
      };
      this.loading = false;
    });
  }

  onSubmit() {
    this.loading = true;
    this.success = false;
    this.error = null;

    this.userService.updateMe(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
    });
  }

  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        () => {
          console.log("closed");
          this.deleteAccount();
        }
      );
  }

  deleteAccount() {
    return new Promise((res, _) => {
      this.userService.deleteMyAccount().subscribe(() => {
        this.isAccountDeleted = true;

        //enough time for user to see success message
        setTimeout(() => {
          this.authService.logout();
          res(true);
        }, 2000);
      });
    })
  }
}
