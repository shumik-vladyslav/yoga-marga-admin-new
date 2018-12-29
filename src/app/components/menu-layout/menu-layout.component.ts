import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/router';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css']
})
export class MenuLayoutComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }
  
  onLogout() {
    console.log('logout');
    this.afAuth.auth.signOut().then(
      _ => this.router.navigate(['sign-in'])
    );
  }
}
