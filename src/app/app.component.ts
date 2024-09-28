import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

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
    this.httpClient.get(environment.reverseProxyUrl + "/webapiexample/error").subscribe(data => {
      console.log("GET:", data);
    })

    this.httpClient.get(environment.reverseProxyUrl + "/webapiexample/GetCarList").subscribe(data => {
      console.log("GET:", data);
    })
  }
}
