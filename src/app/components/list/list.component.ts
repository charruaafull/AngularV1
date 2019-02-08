import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from "angularfire2/database";
import {UsuariosService} from "../../usuarios.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

    items: Observable<any[]>;
    public edit_id;
    public usuario;

    constructor(private db: AngularFireDatabase,
                private usuarioService: UsuariosService) {
        this.items = usuarioService.getUsuarios();
        this.edit_id = '';
    }

    ngOnInit() {
    }

    editar(key, id, name) {
        /*this.usuario = this.usuarioService.getUsuario(key).subscribe(
            res => {
                this.usuario = {
                    'id': res.id,
                    'name': res.name
                };
            }
        );*/

        this.edit_id = {
            'key': key,
            'id': id,
            'name': name
        };
    }

    delete(id) {
        this.usuarioService.eliminarUsuario(id);
        this.edit_id = '';
    }

}
