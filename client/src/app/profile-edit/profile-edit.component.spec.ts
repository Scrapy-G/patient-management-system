import { TestBed } from "@angular/core/testing";
import { ProfileEditComponent } from "./profile-edit.component";
import { AuthService } from "../auth/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsersService } from "../shared/users.service";
import { of } from "rxjs";

describe("ProfileEditComponent", () => {
  let component: ProfileEditComponent;
  let mockUserService;
  let mockAuthService;
  let USER;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj("UsersService", [
      "getMe",
      "deleteMyAccount",
    ]);
    const modalServiceSpy = jasmine.createSpyObj("NgbModal", ["open"]);
    const authServiceSpy = jasmine.createSpyObj("AuthService", ["logout"]);
    USER = {
      name: "John Doe",
      gender: "maile",
      address: "123 Fun St, Ja",
      age: 40,
    };

    TestBed.configureTestingModule({
      providers: [
        ProfileEditComponent,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
        { provide: UsersService, useValue: userServiceSpy },
      ],
    });

    component = TestBed.inject(ProfileEditComponent);
    mockAuthService = TestBed.inject(AuthService);
    mockUserService = TestBed.inject(UsersService);
    TestBed.inject(NgbModal);
  });
  it("should set user correctly from user service", () => {
    mockUserService.getMe.and.returnValue(of(USER));

    component.loadMyProfile();

    expect(component.user).toEqual(jasmine.objectContaining(USER));
  });

  describe("deleteAccount", () => {
    it("should call deleteMyAccount from user service", () => {
      mockUserService.deleteMyAccount.and.returnValue(of(undefined));

      component.deleteAccount();

      expect(mockUserService.deleteMyAccount).toHaveBeenCalled();
    });

    it("should set isAccountDeleted to true", () => {
      mockUserService.deleteMyAccount.and.returnValue(of(undefined));

      component.deleteAccount();

      expect(component.isAccountDeleted).toBeTrue();
    });
  });
});
