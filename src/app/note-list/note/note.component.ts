import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'
import { NoteListComponent } from "./../note-list.component";

import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note!: Note;
  edit = false;
  hovered = false;
  
  constructor(private noteService: NoteListService, noteList: NoteListComponent) { }

  changeMarkedStatus() {
    this.note.marked = !this.note.marked;
    this.saveNote();
  }

  deleteHovered() {
    if (!this.edit) {
      this.hovered = false;
    }
  }

  openEdit() {
    this.edit = true;
  }

  closeEdit() {
    this.edit = false;
    this.saveNote();
  }

  moveToTrash() {
    if (this.note.id) {
      this.note.type = 'trash'; //changes string from 'notes' to 'trash' in firebase collection
      let docId = this.note.id; 
      delete this.note.id; 
      this.noteService.addNote(this.note, 'trash');
      this.noteService.deleteNote('notes', docId); //deletes this.notes in notes-collection
      
    }
  }

  moveToNotes() {
    this.note.type = 'note';
  }

  deleteNote() {

  }

  saveNote() {
    this.noteService.updateNote(this.note);
  }

}
