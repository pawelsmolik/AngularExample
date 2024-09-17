import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private accessToken: string = '';
  constructor(private httpClient: HttpClient){}

  title = 'angular-example';

  private readonly oidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;
          this.accessToken = accessToken
        console.log("idToken", idToken);
        console.log("accessToken", accessToken);
      });
    
      this.oidcSecurityService.getRefreshToken().subscribe(token => {
        console.log("refeash token", token)
      });
  }

  login() {
    console.log("Login!!")
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  runGet() {

    
    this.httpClient.get("https://localhost:7144/error").subscribe(data => {

      console.log("GET:", data);
    })
  }
}
