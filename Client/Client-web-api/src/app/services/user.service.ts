import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token : string;

  constructor(private httpClient : HttpClient) { }

  public getToken( login, password){

     // Initialize Params Object
     let params = new HttpParams();

     // Begin assigning parameters
     params = params.append('login', login);
     params = params.append('password', password);

     return this.httpClient.post("http://localhost/ServeurWebApi/Api/Authentification/GetToken", params);
 
    }
}
