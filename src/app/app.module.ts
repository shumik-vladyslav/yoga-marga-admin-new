import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';
import { AccountsComponent } from './components/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLayoutComponent,
    AccountsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
