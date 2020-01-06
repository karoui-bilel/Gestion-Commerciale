import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Authentification';

  public login: string = 'bilel';
  public password: string = 'bilel';
  public token: string = 'token';
  public erreur : boolean=false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.erreur =false;
    this.userService.token='';
    localStorage.removeItem("token");
  }

  public Authentification() {
    this.userService.getToken(this.login, this.password).subscribe((response: any) => {
      if (response) {
        localStorage.setItem("token", response);
        this.userService.token = response;
       /* setTimeout(() => {
          this.router.navigate(['listeFactures']);
        }, 2000);*/

        this.router.navigate(['listeFactures']);
      }
    },(response : any)=>{
      this.erreur =true;
    });
  }
}
