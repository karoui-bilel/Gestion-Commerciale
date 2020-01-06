import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FactureService } from '../../services/facture-service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatButtonModule } from "@angular/material";
import { LigneFactureComponent } from '../../components/ligne-facture/ligne-facture.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ILigneFacture } from '../../Interfaces/iligne-facture';



@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent implements OnInit {
  public facture: any;
  public listClients: Array<any>;
  public lignesFacture: Array<any>;
  public isTrue: boolean;

  displayedColumns: string[] = ['Designation', 'Prix', 'Qte', 'TVA', 'MontantHT', 'MontantTTC','actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router: Router, private factureService: FactureService, private dialog: MatDialog) {

    if (this.router.getCurrentNavigation().extras.state.facture) {
      this.facture = this.router.getCurrentNavigation().extras.state.facture;
      this.isTrue = true;
    }
    else {
      this.facture = {};
      this.isTrue = false;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }


  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.factureService.getListClient().subscribe((response: any) => {
      this.listClients = response;

    });

    this.factureService.getLignesFacture(this.facture.IdFacture).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<ILigneFacture>(response);
      this.dataSource.paginator = this.paginator
    });
  }

  public setFacture() {

    this.factureService.setFacture(this.facture).subscribe((response: any) => {
      this.isTrue = true;
    });
  }


  public remove(ligne) {
    this.factureService.delLigneFacture(ligne.IdLigne).subscribe((response: any) => {

      this.factureService.getLignesFacture(this.facture.IdFacture).subscribe((response: any) => {
        this.lignesFacture = response;
        this.dataSource = new MatTableDataSource<ILigneFacture>(response);
        this.dataSource.paginator = this.paginator
      });

    });
  }

  public TraitementLigneFacture(ligne) {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (ligne) {
      dialogConfig.data = { ligne, facture: this.facture };
    }

    const dialogRef = this.dialog.open(LigneFactureComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {

        this.factureService.getLignesFacture(this.facture.IdFacture).subscribe((response: any) => {
          this.lignesFacture = response;
          this.dataSource = new MatTableDataSource<ILigneFacture>(response);
          this.dataSource.paginator = this.paginator
        });

      }
    );
  }
}


