import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { devModeEqual } from '@angular/core/src/change_detection/change_detection';

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
  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.groups$ = this.fireStore.collection('groups').valueChanges();
    const subs = this.fireStore.collection('users').valueChanges().subscribe(
      users => {
        this.users = users;
        console.log(users);
        console.log(JSON.stringify(users));
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
          res => console.log(res)
        )
      }
  }

  onGroupChange(group) {
    console.log(group);
    if (group= 'new') {
      // console.log(new);
      // this.modal.nativeElement.style.display = "block";
      
    }
  }

  onUserActiveChange(user, state) {
    console.log(user, event);
    this.fireStore.doc('users/' +user.email).update({active: state}).then(
      res => console.log(res)
    )
  }

}
