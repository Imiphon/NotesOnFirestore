import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note-list/note/note.component';
import { FormsModule } from '@angular/forms';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { initializeApp, getApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { firebaseConfig } from './../environments/environment';
//import { environment } from './../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NoteListComponent,
    NoteComponent,
    AddNoteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //instat of firebaseConfig directly adress it's possible
    //provideFirebaseApp(() => initializeApp(environment.firebase),
   provideFirebaseApp(() => initializeApp({"projectId":"danotes-a93f2","appId":"1:190961739929:web:2d080fac5830e59cefb008","storageBucket":"danotes-a93f2.appspot.com","apiKey":"AIzaSyDgzEeL_C3MnyWvRAt1wdnRfWyC220q1u8","authDomain":"danotes-a93f2.firebaseapp.com","messagingSenderId":"190961739929"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// directly environment instat of full adress: {"projectId":"danotes-a93f2","appId":"1:190961739929:web:2d080fac5830e59cefb008","storageBucket":"danotes-a93f2.appspot.com","apiKey":"AIzaSyDgzEeL_C3MnyWvRAt1wdnRfWyC220q1u8","authDomain":"danotes-a93f2.firebaseapp.com","messagingSenderId":"190961739929"}
