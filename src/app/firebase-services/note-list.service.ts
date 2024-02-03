import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);

  //items$; //'$' shows an observable  
  items$: Observable<Note[]>; 
  items;
  unsubList;
  unsubSingle;
  constructor() {

    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });
    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', '5h9ZCFILos6D3gcIwNa1'), () => {
    });
    this.unsubSingle();
    this.unsubList();

    this.items$ = collectionData(this.getNotesRef(), { idField: 'id' })
    .pipe(
      map(notes => notes as Note[]) // Direkte Typumwandlung zu Note[], da 'id' bereits enthalten ist
    );
  
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
    this.items.unsubscribe();

  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
