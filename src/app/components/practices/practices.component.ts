import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.css']
})
export class PracticesComponent implements OnInit, OnDestroy {
  typeFilter;
  practices;
  unfilteredPractices;
  subscriptions: Subscription = new Subscription();
  constructor(private fireStore: AngularFirestore, private route: ActivatedRoute) { 
      const subs = this.fireStore.collection('practices').valueChanges().subscribe(
        pr => {
          this.unfilteredPractices = pr;
          if (this.typeFilter) {
            this.practices = pr.filter( (p:any) => p.type == this.typeFilter);
          } else {
            this.practices = pr;
          }
          
        }
      )

      this.subscriptions.add(subs);
    }

  ngOnInit() {
    const subs = this.route.params.subscribe(params => {
      this.typeFilter = params['type'];
      console.log(this.typeFilter);
      if (!this.typeFilter || this.typeFilter == '') {
        this.practices = this.unfilteredPractices;
      } else if(this.unfilteredPractices) {
        this.practices = this.unfilteredPractices.filter( (p:any) => p.type == this.typeFilter);
      }
   });

   this.subscriptions.add(subs);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPracticeActiveChange(p, state) {
    this.fireStore.doc('practices/' + p.id).update({active: state}).then(
      res => console.log(res)
    )
  }
}
