import { AccountsComponent } from "./components/accounts/accounts.component";
import { Component } from "@angular/core";
import { MenuLayoutComponent } from "./components/menu-layout/menu-layout.component";
import { Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AppGuard } from "./app.guard";

export const routes: Routes = [
  {
    path: "",
    component: MenuLayoutComponent,
    children: [
      {
        path: "accounts",
        component: AccountsComponent,
        canActivate: [AppGuard]
      },
      {
        path: "",
        component: AccountsComponent,
        canActivate: [AppGuard]
      }
    ]
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "**",
    component: SignInComponent
  }
];
