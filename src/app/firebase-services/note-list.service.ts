import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);

  //items$; //'$' shows an observable  
  //items; 

  constructor() { 
/**
 *   this.items$ = collectionData(this.getNotesRef()); 
  this.items = this.items$.subscribe((list) => {
    list.forEach(element => {
      console.log(element);
    });
  })  
  this.items.unsubscribe();
 */
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId);
  }
}
