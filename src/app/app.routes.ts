import { AccountsComponent } from './components/accounts/accounts.component';
import { Component } from '@angular/core';
import { MenuLayoutComponent } from "./components/menu-layout/menu-layout.component";
import { Routes } from "@angular/router";
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: "", component: MenuLayoutComponent, children: [
    {
        path: "accounts",
        component: AccountsComponent
    },
    {
        path: "",
        component: AccountsComponent
    },
  ] },
  {
      path: "sign-in",
      component: SignInComponent
  }
];
