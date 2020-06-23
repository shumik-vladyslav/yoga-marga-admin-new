import { PracticeModalComponent } from './../practice-modal/practice-modal.component';
import { FullModalService } from './../full-modal/full-modal.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { devModeEqual } from '@angular/core/src/change_detection/change_detection';
import { map,take } from 'rxjs/operators';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal:ElementRef;
  subscriptions: Subscription = new Subscription();
  users;
  groups$;
  tmp;
  constructor(private fireStore: AngularFirestore, public modalService: FullModalService) { }

  ngOnInit() {
    console.log('init');
    this.groups$ = this.fireStore.collection('groups').valueChanges().pipe(map(
      gr => gr.map((g: any) => g.name)
    ),take(1));
    const subs = this.fireStore.collection('users').valueChanges().subscribe(
      users => {
        this.users = users.sort((x:any,y:any) =>  (x.active === y.active)? 0 : x.active? 1 : -1);
        console.log('users', users);
      }
    )
    this.subscriptions.add(subs);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onNewGroup() {
    // this.fireStore.collection('groups').add({
    //   name: 'opa'
    // })

    const name = prompt('Введите название группы');
      if (name && name != '') {
        this.fireStore.doc('groups/' + name).set({name: name}).then(
          res => {

            console.log(res);
          }
        )
      }
  }

  onGroupChange(user, e) {
    console.log(user,e);
    this.fireStore.doc('users/' + user.email).update({groups:e}).then(
      res => console.log(res)
    )
  }

  onUserActiveChange(user, state) {
    console.log(user, event);
    this.fireStore.doc('users/' + user.email).update({active: state}).then(
      res => console.log(res)
    )
  }

}
