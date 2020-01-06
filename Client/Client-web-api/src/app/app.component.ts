import { Component, OnInit ,Directive} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title : string =  'Gestion commercial';

  public constructor(){

  }
  
  public ngOnInit(){
    
  }

}
