import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private httpClient: HttpClient) { }

  public getFacture() {
    return this.httpClient.get("http://localhost/ServeurWebApi/Api/Facture/GetListFacture");

  }

  public delFacture(IdFacture: number): Observable<{}> {
    return this.httpClient.delete("http://localhost/ServeurWebApi/Api/Facture/DeleteFacutre?IdFacture=" + IdFacture)
      ;
  }

  public setFacture(facture: any) {
    return this.httpClient.post("http://localhost/ServeurWebApi/Api/Facture/SetFacutre", facture);

  }

  public getListClient() {
    return this.httpClient.get("http://localhost/ServeurWebApi/Api/Facture/GetListContacts");

  }

  public getLignesFacture(IdFacture: number) {
    let params = new HttpParams().set('IdFacture', IdFacture.toString());
    return this.httpClient.get("http://localhost/ServeurWebApi/Api/Facture/GetLignesFacture", { params: params });

  }

  public delLigneFacture(IdLigne: number): Observable<{}> {
    return this.httpClient.delete("http://localhost/ServeurWebApi/Api/Facture/DeleteLigneDetailsFacutre?IdLigne=" + IdLigne)
      ;
  }

  public getListProduits() {
    return this.httpClient.get("http://localhost/ServeurWebApi/Api/Facture/GetListProduits");

  }

  public setLigneDetailsFacutre(ligne: any) {
    return this.httpClient.post("http://localhost/ServeurWebApi/Api/Facture/SetLigneDetailsFacutre", ligne);

  }

  public getProduit(IdProduit: number) {
     let params = new HttpParams().set('IdProduit', IdProduit.toString());
    return this.httpClient.get("http://localhost/ServeurWebApi/Api/Facture/GetProduit", { params: params })
  }

}
