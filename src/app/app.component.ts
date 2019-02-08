import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    /*public session: boolean;*/

    constructor(private router: Router) {
       /* let usuario = localStorage.getItem('usuario');
        if(!usuario){
            this.router.navigateByUrl('/login');
            this.session = false;
        }else{
            this.session = true;
            this.router.navigateByUrl('/list');
        }*/
    }


    ngOnInit() {

    }

    /*logout() {
        localStorage.clear();
        this.session = false;
        this.router.navigateByUrl('/login');
    }*/

}
