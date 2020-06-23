import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  feedbacks;
  users;
  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.users = this.fireStore.collection('users').valueChanges().subscribe (
      us => this.users = us 
    );
    this.fireStore.collection('feedbacks').snapshotChanges().subscribe(
      (snap) => {
         let tmp = snap.map(docChAct => {
          const res:any = docChAct.payload.doc.data();
          res.id = docChAct.payload.doc.id;
          console.log(res);
          return res;
        })
        this.feedbacks = tmp.sort((x:any,y:any) =>  (x.timestamp === y.timestamp)? 0 : x.timestamp < y.timestamp? 1 : -1);
      }
    );
  }

  onDelete(notificatoon) {
    console.log(notificatoon);
    this.fireStore.doc('feedbacks/'+ notificatoon.id).delete().then();
  }

  onUserClick(email) {
    console.log('users', this.users);
    console.log('email', email);
    const res = this.users.filter( u => u.email == email);
    if(res.length >0) {
      const user = res[0];
      console.log('user', );
      alert(`
      Духовное имя: ${user.spiritual_name}
      Имя и фамилия: ${user.full_name} 
      `)
    }
  }

}
