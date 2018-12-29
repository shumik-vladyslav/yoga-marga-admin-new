import { PracticeModalComponent } from './components/practice-modal/practice-modal.component';
import { PracticesComponent } from './components/practices/practices.component';
import { AccountsComponent } from "./components/accounts/accounts.component";
import { Component } from "@angular/core";
import { MenuLayoutComponent } from "./components/menu-layout/menu-layout.component";
import { Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AppGuard } from "./app.guard";
import { GroupsComponent } from './components/groups/groups.component';
import { NotificationComponent } from './components/notification/notification.component';

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
        path: "groups",
        component: GroupsComponent,
        canActivate: [AppGuard]
      },
      {
        path: "practices/:type",
        component: PracticesComponent,
        canActivate: [AppGuard]
      },
      {
        path: "modal",
        component: PracticeModalComponent,
        canActivate: [AppGuard]
      },
      {
        path: "practice-modal",
        component: PracticeModalComponent,
        canActivate: [AppGuard]
      },
      {
        path: "notifications",
        component: NotificationComponent,
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
