import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  normalNotes: Note[] = [];
  trashNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() { 

  }
      
    //const itemCollection = collection(this.firestore, 'items');

    getNotesRef(){
      return collection(this.firestore, 'notes');
    }

    getTrashRef(){
      return collection(this.firestore, 'trash');
    }
    //returns ID of collection and single-document-ID from firebase
    getSingleDocRef(colId: string, docId:string){
      return doc(collection(this.firestore, colId), docId)
    }
}
