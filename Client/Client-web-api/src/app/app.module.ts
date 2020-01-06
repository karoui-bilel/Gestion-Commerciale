import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material';



//services
import { FactureService } from './services/facture-service.service';
import { UserService } from './services/user.service';
import { BasicAuthInterceptor } from './services/BasicAuthInterceptor.service';
import { ErrorInterceptor } from './services/ErrorInterceptor.service';
import { ListeFacturesComponent } from './components/liste-factures/liste-factures.component';
import { LoginComponent } from './components/login/login.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './services/loader.interceptor';
import { FactureComponent } from './components/facture/facture.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DetailsFactureComponent } from './components/details-facture/details-facture.component';
import { LigneFactureComponent } from './components/ligne-facture/ligne-facture.component';
import { MatSortModule } from '@angular/material'
import { MatTableModule } from '@angular/material'
import { MatPaginatorModule } from '@angular/material';
import { HighlightDirective } from './directives/highlight.directive';
//

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LoaderComponent,
    ListeFacturesComponent,
    LoginComponent,
    FactureComponent,
    DetailsFactureComponent,
    LigneFactureComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule

  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    UserService,
    FactureService,
    LoaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LigneFactureComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
