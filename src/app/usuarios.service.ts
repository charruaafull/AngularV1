import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/index";
import {Users} from "./models/users";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUsuarios() {
        return this.db.list('usuarios')
            .snapshotChanges()
            .pipe(map(items => {             // <== new way of chaining
                return items.map(a => {
                    const data = a.payload.val();
                    const key = a.payload.key;
                    return {key, data};           // or {key, ...data} in case data is Obj
                });
            }));
    }

    public crearUsuario(usuario) {
        const itemsRef = this.db.list('usuarios');
        let param = {
          'id': usuario.id,
          'name': usuario.name
        };
        return itemsRef.push(param);
    }

    public editarUsuario(key, usuario) {
        const itemsRef = this.db.list('usuarios');
        let param = {
            'id': usuario.id,
            'name': usuario.name
        };
        return itemsRef.update(key, param);
    }

    public eliminarUsuario(id) {
        const itemsRef = this.db.list('usuarios');
        return itemsRef.remove(id);
    }

    public getUsuario(id_editar) {
        let items = this.db.object('usuarios/' + id_editar).valueChanges();
        return items;
    }
}