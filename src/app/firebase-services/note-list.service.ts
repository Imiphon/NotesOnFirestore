import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
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

    //    // Initialisierung des Observables mit Daten aus der Firestore-Sammlung 'notes'
    //    this.items$ = collectionData(this.getNotesRef());
    //    // Abonnieren des Observables, um auf Änderungen in der 'notes'-Sammlung zu reagieren
    //    this.items = this.items$.subscribe((list) => {
    //      // Iteration über jede empfangene Notiz und Ausführung einer Aktion (hier: Ausgabe in der Konsole)
    //      list.forEach(element => {
    //        console.log('Initialisierung des Observables mit collactionData()', element);
    //      })
    //    });

  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        console.log('onSnapshot mit Initialisierung', element);
        console.log('onSnapshot mit id des elemts', element.id);
        console.log('onSnapshot mit data(), ergibt gleiches Ergebnis wie die collectionData()', element.data());
        console.log('onSnapshot mit setNoteObject()', this.setNoteObject(element.data(), element.id));
      })
    });
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log('onSnapshot mit Initialisierung', element);
        console.log('onSnapshot mit id des elemts', element.id);
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
      marked: obj.marked || '',
    }
  }

  ngonDestroy() {
    this.unsubNotes;
    this.unsubTrash;

    //  this.items.unsubscribe()

  }

  // Methode zur Erstellung eines Referenzobjekts für die 'notes'-Sammlung in Firestore
  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  // Methode zur Erstellung eines Referenzobjekts für die 'trash'-Sammlung in Firestore
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  // Methode zur Erstellung eines Referenzobjekts für ein einzelnes Dokument innerhalb einer spezifischen Sammlung
  // basierend auf der Sammlungs-ID (`colId`) und der Dokument-ID (`docId`)
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
