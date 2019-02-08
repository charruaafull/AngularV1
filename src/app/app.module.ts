import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListComponent} from './components/list/list.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateComponent} from './components/create/create.component';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireStorageModule } from 'angularfire2/storage';
import { LoginComponent } from './components/login/login.component';
import {UsuariosService} from "./usuarios.service";

const routes: Routes = [
    {path: 'list', component: ListComponent},
    {path: '', redirectTo: '/list', pathMatch: 'full'} //Esto redirecciona automaticamente a la ruta
];

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        CreateComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyDIP-M-DhoEe04ErimGabxUosytkeXIzWc",
            authDomain: "dbangular-8e1a7.firebaseapp.com",
            databaseURL: "https://dbangular-8e1a7.firebaseio.com",
            projectId: "dbangular-8e1a7",
            storageBucket: "dbangular-8e1a7.appspot.com",
            messagingSenderId: "480453005017"
        }),
        AngularFireStorageModule
    ],
    providers: [AngularFireDatabase,UsuariosService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
