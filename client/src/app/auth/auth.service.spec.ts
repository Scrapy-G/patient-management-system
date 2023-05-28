import { TestBed } from "@angular/core/testing";
import { ApiService } from "../shared/api.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { of } from "rxjs";

class MockApiService {
    post() { }
    get() {}
}

describe('AuthService', () => {
    let service;
    let mockApiService;
    let mockRouter;

    beforeEach(() => {
        const mockApiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
        const mockRouterSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
          providers: [
            AuthService,
            { provide: ApiService, useValue: mockApiServiceSpy },
            { provide: Router, useValue: mockRouterSpy },
          ],
        });

        service = TestBed.inject(AuthService);
        mockRouter = TestBed.inject(Router);
        mockApiService = TestBed.inject(ApiService)

    })

    describe('login', () => {
        let token;
        let USER = {
          _id: "6472a89ae01b019f24647f71",
          role: "patient",
          name: "Chad McKenzie",
        };

        beforeEach(() => {
            token =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyYTg5YWUwMWIwMTlmMjQ2NDdmNzEiLCJyb2xlIjoicGF0aWVudCIsIm5hbWUiOiJDaGFkIE1jS2VuemllIiwiaWF0IjoxNjg1MjM4NTMxfQ.bqCNJoMjYIW7cp3IGka51eY1yowMZj06QgDaxyFhdnM";
        })

        it('should set user from token payload', () => {
            mockApiService.post.and.returnValue(of({ token }));  
            
            service.login(null, null).subscribe();

            expect(service.user.value).toEqual(jasmine.objectContaining(USER))

        });

        it('should set token from api service', () => { 
            mockApiService.post.and.returnValue(
              of({ token })
            );

            service.login(null, null).subscribe();

            expect(service.token).toEqual(token);
        })

        it("should save token in local storage", () => { 
            mockApiService.post.and.returnValue(of({ token }));

            service.login(null, null).subscribe();

            let storedToken = localStorage.getItem("token");
            expect(storedToken).toEqual(token);
        });
    })

    it('should set user to null on logout', () => {
        service.user.next({
          _id: "6472a89ae01b019f24647f71",
          role: "patient",
          name: "Mike Paul",
        });

        service.logout();

        expect(service.user.value).not.toBeTruthy();
    })
})