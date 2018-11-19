import { environment } from './../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { RouterModule } from "@angular/router";
import { MenuLayoutComponent } from "./components/menu-layout/menu-layout.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { SignInComponent } from './components/sign-in/sign-in.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticesComponent } from './components/practices/practices.component';
import { PracticeModalComponent } from './components/practice-modal/practice-modal.component';

@NgModule({
  declarations: [AppComponent, MenuLayoutComponent, AccountsComponent, SignInComponent, PracticesComponent, PracticeModalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }), 
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
