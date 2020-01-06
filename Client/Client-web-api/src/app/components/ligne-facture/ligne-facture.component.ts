import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FactureService } from '../../services/facture-service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-ligne-facture',
  templateUrl: './ligne-facture.component.html',
  styleUrls: ['./ligne-facture.component.css']
})
export class LigneFactureComponent implements OnInit {

  public facture: any;
  public ligne: any;
  public listProduits: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<LigneFactureComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any,
    private factureService: FactureService
  ) {
    if (data) {
      this.ligne = data.ligne;
      this.facture = data.facture;
    }
    else {
      this.ligne = {};
      this.facture = {};
    }
  }



  ngOnInit() {
    this.factureService.getListProduits().subscribe((response: any) => {
      this.listProduits = response;


    });
  }

  public setLigneFacture(ligne) {
    //let index = this.factures.indexOf(facture);
    //if (index > -1)
    // this.factures.splice(index, 1);

    ligne.IdFacture = this.facture.IdFacture;
    this.factureService.setLigneDetailsFacutre(ligne).subscribe((response: any) => {
      this.dialogRef.close();
    });
  }

  getInfosProduit() {
    this.factureService.getProduit(this.ligne.IdProduit).subscribe((response: any) => {
      this.ligne.Prix = response.Prix;
      this.ligne.TVA = response.TVA;
      this.calcul();
    });

  }

  public calcul() {
    if (this.ligne.Qte == null)
      this.ligne.Qte = 1;

    this.ligne.MontantHT = this.ligne.Prix * this.ligne.Qte;
    this.ligne.MontantTTC = this.ligne.MontantHT + (this.ligne.MontantHT * (this.ligne.TVA / 100));
  }
}
