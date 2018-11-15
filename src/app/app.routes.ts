import { AccountsComponent } from './components/accounts/accounts.component';
import { Component } from '@angular/core';
import { MenuLayoutComponent } from "./components/menu-layout/menu-layout.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", component: MenuLayoutComponent, children: [
    {
        path: "accounts",
        component: AccountsComponent
    }
  ] }
];
