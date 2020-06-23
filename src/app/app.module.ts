import { ChipsComponent } from './components/chips/chips.component';
import { FullModalModule } from './components/full-modal/full-modal.module';
import { environment } from './../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsComponent } from './components/groups/groups.component';
import { NotificationComponent } from './components/notification/notification.component';
import { IsArrayPipe } from 'src/pipes/is-array.pipe';
@NgModule({
  declarations: [AppComponent, MenuLayoutComponent, 
    AccountsComponent, SignInComponent, ChipsComponent, 
    PracticesComponent, PracticeModalComponent, GroupsComponent, 
    NotificationComponent, IsArrayPipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FullModalModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PracticeModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
