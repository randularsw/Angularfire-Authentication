import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // items: Observable<any[]>;
  items;


  constructor(private firestore: AngularFirestore) {
    // this.items = firestore.collection('items', ref => ref.where("name", "==", "ghost").where("age", ">", 23)).valueChanges().subscribe(res => {
    //   this.items = res;
    //   console.log(this.items);
    // }, err => {
    //   console.log(err);
    // });
  }

  // add() {
  //   let x = this.firestore.collection('chats').doc('blTn6xxa91NNCMwJi1Y7').collection('messages').add({
  //     name: "reaper",
  //     age: 24444,
  //     time: new Date()
  //   });
  //   console.log(x);
  // }
}
