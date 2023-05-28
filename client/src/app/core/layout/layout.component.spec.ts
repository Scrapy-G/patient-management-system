// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { BehaviorSubject, of } from "rxjs";
// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { LayoutComponent } from "./layout.component";

// describe("LayoutComponent", () => {
//   let mockAuthService: any;
//   let fixture: ComponentFixture<LayoutComponent>;
//   let component: LayoutComponent;
//   let USER: any;

//   beforeEach(() => {
//     mockAuthService = {
//       logout: jasmine.createSpy(),
//       user: new BehaviorSubject(USER),
//     };
//     USER = { _id: 1, name: "John Doe", role: "patient" };
//     component = new LayoutComponent(mockAuthService);

//     TestBed.configureTestingModule({
//       providers: [{ provide: "AuthService", useValue: mockAuthService }],
//       imports: [HttpClientTestingModule],
//     });
//     fixture = TestBed.createComponent(LayoutComponent);
//     component = fixture.componentInstance;
//   });

//   it("should subscribe to user from auth service and store value to user property on initialization", () => {
//     //arrange
//     // mockAuthService.user.and.returnValue(of(USER));

//     //act
//     component.loadUser();
    
//     //assert
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(component.user).toEqual(USER);
//       expect(mockAuthService.user.subscribe).toHaveBeenCalled();
//     });
//   });
// });
