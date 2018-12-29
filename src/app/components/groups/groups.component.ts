import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { group } from '@angular/animations';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups$;
  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.groups$ = this.fireStore.collection('groups').valueChanges();
  }

  onDelete(group) {
    console.log('delete', group);
    this.fireStore.doc('groups/'+ group.name).delete().then()
  }


  onCreate() {
    const name = prompt('Введите название группы');
      if (name && name != '') {
        this.fireStore.doc('groups/' + name).set({name: name}).then(
          res => {
            console.log(res);
          }
        )
      }
  }
}
