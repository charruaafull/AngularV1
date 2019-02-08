import {Component, OnInit} from '@angular/core';
import {Login} from "../../models/login";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public login: Login;
    public alertError: string;

    constructor(private router: Router) {
        this.login = new Login('', '');
    }

    ngOnInit() {
        let usuario = localStorage.getItem('usuario');
        if (usuario) {
            this.router.navigateByUrl('/list');
        }
    }

    onSubmit() {
        let params = this.login;
        let user = params.usuario;
        let password = params.password;
        if (user == 'Brian' && password == '123') {
            localStorage.setItem('usuario', 'Brian');
            this.router.navigateByUrl('/list');
        } else {
            this.alertError = 'Datos incorrectos';
        }
    }

}
