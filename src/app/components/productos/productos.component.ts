import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Observable} from "rxjs/index";
import {Productos} from "../../models/productos";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrManager} from "ng6-toastr-notifications";

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

    public producto: Productos;
    public productos;
    public id_editar: String = '';

    constructor(private productosService: ProductosService,
                public toastr: ToastrManager,) {
        this.producto = new Productos('', null, null, null);
        this.getProductos();
    }

    getProductos() {
        var userObservable = this.productosService.getProductos().subscribe(
            res => this.productos = res
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

    }

}
