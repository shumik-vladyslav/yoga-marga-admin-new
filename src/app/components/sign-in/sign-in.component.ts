import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  form;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(".{8,}")]]
    });
  }

  ngOnInit() {
    
  }

  onSignIn() {
    const val = this.form.value;
    this.authServ
      .signIn(val.email, val.password)
      .then(res => this.router.navigate(["/"]))
      .catch(err => alert(err));
  }
}
