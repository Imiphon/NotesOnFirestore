import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  normalNotes: Note[] = [];
  trashNotes: Note[] = [];

  //  items$; // Variable für das Observable, das die Notizdaten streamt ($ Zeichen deutet auf Observable hin)
  //  items; // Variable für die Subscription des Observables
  firestore: Firestore = inject(Firestore); // Injektion des Firestore-Services zur Datenbankinteraktion

  unsubTrash;
  unsubNotes;

  constructor() {
    //onSnapshot Variante, anstelle der Oservable-Variante(n) mit items$ (siehe unten) 
    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();
    /**
    //onSnapshot Variante für Einzelne notes
    this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "0aVV48SSyWPjGGOZ6t7Z"), (element) => {
    });
     */

    /**
         // Dies ist eine ASYNC PIPE 
         //Initialisierung des Observables mit Daten aus der Firestore-Sammlung 'notes'
        this.items$ = collectionData(this.getNotesRef());
        // Abonnieren des Observables, um auf Änderungen in der 'notes'-Sammlung zu reagieren
        this.items = this.items$.subscribe((list) => {
          // Iteration über jede empfangene Notiz und Ausführung einer Aktion (hier: Ausgabe in der Konsole)
          list.forEach(element => {
            console.log('Initialisierung des Observables mit collactionData()', element);
          })
        });
     */

  }

  //note is coming from add.note-dialog.component.ts 
  async addNote(item: Note, colId: string) {
    // sends notes or trash to right collection
    let targetCollectionRef;
    if (colId === 'trash') {
      targetCollectionRef = this.getTrashRef();
    } else {
      targetCollectionRef = this.getNotesRef();
    }

    // set doc to right target, catch error if neccessary
    await addDoc(targetCollectionRef, item).catch(
      (err) => { console.log(err) }
    ).then(
      (docRef) => { console.log('Document added with ID:', docRef?.id) }
    );
  }

  async updateNote(note: Note) {
    //updateDoc needs two arguments
    if (note.id) {
      let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
      await updateDoc(docRef, this.getCleanJson(note)).catch(
        (err) => {
          console.log(err);
        }
      ).then(() => { console.log('any then-stuff') });
    }

  }

  async deleteNote(colId: 'notes' | 'trash', docId: string) {
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => {
        console.log(err);
      } //.then {} not neccessary yet
    );
  }

  getCleanJson(note: Note) {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked,
    }
  }

  /**
   * 'note' to 'notes' for right collection-name in firestore database
   * @param note 
   * @returns string 
   */
  getColIdFromNote(note: Note) {
    if (note.type == 'note') {
      return 'notes'
    } else {
      return 'trash'
    }
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      })
    });
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));

        console.log('onSnapshot mit data(), ergibt gleiches Ergebnis wie die collectionData()', element.data());
        console.log('onSnapshot mit setNoteObject()', this.setNoteObject(element.data(), element.id));
      })
    });
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || '',
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
    }
  }

  ngonDestroy() {
    this.unsubNotes;
    this.unsubTrash;

    //  this.items.unsubscribe()

  }

  // returns content of notes in Firestore Collection
  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  // returns content of trash in Firestore Collection
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  /** 
   * @param colId collection-name in firestore database (notes or trash)
   * @param docId 
   * @returns 
   */
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
