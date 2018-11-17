import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: firebase.auth.UserCredential;
  constructor(public afAuth: AngularFireAuth) {
  }

  signIn(email: string, password: string): Promise<firebase.auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
      user => this.user = user
    )
  }

  // public user():Promise<firebase.auth.UserCredential> {
  //   if(this._user) {
  //     return Promise.resolve(this._user);
  //   } else {

  //   }
  // }
}
