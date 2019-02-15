import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListComponent} from './components/list/list.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateComponent} from './components/create/create.component';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireStorageModule} from 'angularfire2/storage';
import {LoginComponent} from './components/login/login.component';

import {UsuariosService} from "./usuarios.service";
import {ProductosService} from "./services/productos.service";

import {ToastrModule} from "ng6-toastr-notifications";
import {HttpModule} from '@angular/http';
import {ProductosComponent} from './components/productos/productos.component';
import {DataTableModule} from "angular-6-datatable";

import {DataTableModule} from "angular2-datatable";

const routes: Routes = [
    {path: 'list', component: ListComponent},
    {path: 'productos', component: ProductosComponent},
    {path: '', redirectTo: '/productos', pathMatch: 'full'} //Esto redirecciona automaticamente a la ruta
];

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        CreateComponent,
        LoginComponent,
        ProductosComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ToastrModule.forRoot(),
        FormsModule,
        DataTableModule,
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
    providers: [AngularFireDatabase, UsuariosService,ProductosService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
