import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  public Login(){
    localStorage.removeItem("token");
      this.router.navigate(['login']);
      
  }

  public TraitementFacture(facture) {

    this.router.navigate(['detailsFacture'], { state: { facture } });
  }

}
