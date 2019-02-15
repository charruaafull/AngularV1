import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {identity} from "rxjs/util/identity";

@Injectable()
export class ProductosService {
    public url: String;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    nuevoProducto(producto) {
        let params = JSON.stringify(producto);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'producto', params, {headers: headers})
            .map(res => res.json());
    }

    editarProducto(id, producto) {
        producto.id = id;
        let params = JSON.stringify(producto);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'updateProducto', params, {headers: headers})
            .map(res => res.json());
    }

    getProductos() {
        return this._http.get(this.url + 'getProductos').map(response => response.json());
    }

    getProducto(id) {
        return this._http.get(this.url + 'getProducto/' + id).map(response => response.json());
    }

    getCode(id) {
        return this._http.get(this.url + 'getCode/' + id).map(response => response.json());
    }

    eliminarProducto(id) {
        return this._http.delete(this.url + 'deleteProducto/' + id).map(response => response.json());
    }

}
