import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Observable} from "rxjs/index";
import {Productos} from "../../models/productos";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrManager} from "ng6-toastr-notifications";
import {Http} from "@angular/http";

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

    public producto: Productos;
    public productos;
    public id_editar: String = '';
    public datos: any[];
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "email";
    public sortOrder = "asc";

    constructor(private productosService: ProductosService,
                private _http: Http,
                public toastr: ToastrManager,) {
        this.producto = new Productos('', null, null, null);
        this.getProductos();
    }

    getProductos() {
        var userObservable = this.productosService.getProductos().subscribe(
            res => this.datos = res
        );
    }

    addProducto() {

        if (this.id_editar != '') {
            this.productosService.editarProducto(this.id_editar, this.producto).subscribe(
                res => {
                    if (res) {
                        this.getProductos();
                        this.toastr.successToastr('Se editó correctamente', 'Perfecto!');
                        this.id_editar = '';
                        this.producto = new Productos('', null, null, null);
                    } else {
                        this.toastr.errorToastr('Error al editar', 'Error!');
                    }
                }
            )
        } else {
            this.productosService.nuevoProducto(this.producto).subscribe(
                res => {
                    if (res) {
                        this.getProductos();
                        this.toastr.successToastr('Se agregó correctamente', 'Perfecto!');
                        this.producto = new Productos('', null, null, null);
                    }
                },
                err => {
                    this.toastr.errorToastr('No se pudo agregar', 'Error!');
                }
            );
        }
    }

    editar(id) {
        this.productosService.getProducto(id).subscribe(
            res => {
                if (res) {
                    this.id_editar = id;
                    this.producto = new Productos(res.name, res.category, res.stock, res.price);
                }
            }
        )
    }

    ngOnInit() {
      /*  this._http.get("assets/data.json")
            .subscribe((data) => {
                setTimeout(() => {
                    this.datos = data.json();
                }, 2000);
            }); */
    }

}
