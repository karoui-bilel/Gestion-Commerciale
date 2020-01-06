import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FactureService } from '../../services/facture-service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})

export class FactureComponent implements OnInit {
  public facture: any;
  public listClients: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<FactureComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any,
    private factureService: FactureService
  ) {
    if (data) {
      this.facture = data.facture ;
    }
    else{
      this.facture = {};
    }
  }



  ngOnInit() {
      this.factureService.getListClient().subscribe((response: any) => {
        this.listClients = response;

        
      });
  }

  public setFacture(facture) {
    //let index = this.factures.indexOf(facture);
    //if (index > -1)
     // this.factures.splice(index, 1);


     this.factureService.setFacture(facture).subscribe((response: any) => {
      this.dialogRef.close();
    });
  }

}
