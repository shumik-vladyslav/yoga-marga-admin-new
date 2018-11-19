import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(
      (user: User) => {
        this.user = user;
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/sign-in']);
      }
    )
  }

  signIn(email: string, password: string): Promise<User>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
      (user:firebase.auth.UserCredential) => this.user = user.user
    )
  }

}
