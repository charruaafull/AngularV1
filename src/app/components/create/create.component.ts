import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Users} from "../../models/users";
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuariosService} from "../../usuarios.service";
import {ToastrManager} from "ng6-toastr-notifications";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    registerForm: FormGroup;
    public usuario: Users;
    public titleCard: String = 'Nuevo usuario';
    @Input() id_editar;

    constructor(private db: AngularFireDatabase,
                private formBuilder: FormBuilder,
                public toastr: ToastrManager,
                private usuarioService: UsuariosService) {
        this.usuario = new Users('', '');
    }

    ngOnChanges() {
        if (this.id_editar) {
            this.titleCard = 'Editar usuario: ' + this.id_editar.name;
            this.usuario = new Users(this.id_editar.id, this.id_editar.name);
        }else{
            this.usuario = new Users('','');
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            id: ['', [Validators.required, Validators.min(1)]],
            name: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            return;
        } else {
            if (this.id_editar.key) {
                this.usuarioService.editarUsuario(this.id_editar.key, this.usuario);
                this.toastr.successToastr('Editado satisfactoriamente', 'Success!');
            } else {
                this.usuarioService.crearUsuario(this.usuario);
                this.toastr.successToastr('Agregado satisfactoriamente', 'Success!');
            }
            this.id_editar = '';
            this.usuario = new Users('', '');
            this.titleCard = 'Nuevo usuario';
            this.registerForm.reset();
        }
    }

    get f() {
        return this.registerForm.controls;
    }

}
