import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../services/facture-service.service';
import { MatDialog, MatDialogConfig, MatButtonModule } from "@angular/material";
import { FactureComponent } from '../../components/facture/facture.component';
import { DetailsFactureComponent } from '../../components/details-facture/details-facture.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listFacture',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css']
})

export class ListeFacturesComponent implements OnInit {

  public factures: Array<any>;

  public constructor(private factureService: FactureService, private dialog: MatDialog, private router: Router) {

  }


  public ngOnInit() {
    this.factureService.getFacture().subscribe((response: any) => {
      this.factures = response;
    });
  }

  public remove(facture) {
    //let index = this.factures.indexOf(facture);
    //if (index > -1)
    // this.factures.splice(index, 1);


    this.factureService.delFacture(facture.IdFacture).subscribe((response: any) => {

      this.factureService.getFacture().subscribe((response: any) => {
        this.factures = response;
      });

    });

  }

  public TraitementFacture(facture) {

    this.router.navigate(['detailsFacture'], { state: { facture } });
  }
}
