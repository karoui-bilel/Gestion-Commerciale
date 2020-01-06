import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeFacturesComponent } from './components/liste-factures/liste-factures.component';
import { LoginComponent } from './components/login/login.component';
import { FactureComponent } from './components/facture/facture.component';
import { DetailsFactureComponent } from './components/details-facture/details-facture.component';
import { LigneFactureComponent } from './components/ligne-facture/ligne-facture.component';

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'listeFactures', component : ListeFacturesComponent},
  {path : 'login', component : LoginComponent},
  {path : 'facture', component : FactureComponent},
  {path : 'detailsFacture', component : DetailsFactureComponent},
  {path : 'ligneFacture', component : LigneFactureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
