import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Observable} from "rxjs/index";
import {Productos} from "../../models/productos";
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrManager} from "ng6-toastr-notifications";
import {Users} from "../../models/users";

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

    productosForm: FormGroup;
    public producto: Productos;
    public productos;
    public id_editar: String = '';
    public emailCode;

    constructor(private productosService: ProductosService,
                private formBuilder: FormBuilder,
                public toastr: ToastrManager,) {
        this.producto = new Productos('', '', null, null, null);
        this.getProductos();
    }

    getProductos() {
        var userObservable = this.productosService.getProductos().subscribe(
            res => this.productos = res
        );
    }

    addProducto() {

        if (this.productosForm.invalid) {
            return;
        } else {
            if (this.id_editar != '') {
                this.productosService.editarProducto(this.id_editar, this.producto).subscribe(
                    res => {
                        if (res) {
                            this.getProductos();
                            this.toastr.successToastr('Se editó correctamente', 'Perfecto!');
                            this.id_editar = '';
                            this.producto = new Productos('', '', null, null, null);
                        } else {
                            this.toastr.errorToastr('Error al editar', 'Error!');
                        }
                    }
                )
            } else {
                console.log(this.producto);
                this.productosService.nuevoProducto(this.producto).subscribe(
                    res => {
                        if (res) {
                            this.getProductos();
                            this.toastr.successToastr('Se agregó correctamente', 'Perfecto!');
                            this.producto = new Productos('', '', null, null, null);
                        }
                    },
                    err => {
                        this.toastr.errorToastr('No se pudo agregar', 'Error!');
                    }
                );
            }

            this.productosForm.reset();
        }
    }

    editar(id) {
        this.productosService.getProducto(id).subscribe(
            res => {
                if (res) {
                    this.id_editar = id;
                    this.producto = new Productos(res.code, res.name, res.category, res.stock, res.price);
                }
            }
        )
    }

    deleteProducto(id, name) {
        if (window.confirm('¿Está seguro que desea eliminar el producto ' + name + '?')) {
            this.productosService.eliminarProducto(id).subscribe(
                res => {
                    if (res) {
                        this.getProductos();
                        this.toastr.successToastr('Se eliminó correctamente', 'Perfecto!');
                    }
                }
            )
        }
    }

    ValidateCpf(control: AbstractControl) {
        if (control.value) {
            this.productosService.getCode(control.value).subscribe(
                res => {
                    if (!res.producto) {
                        return true;
                    } else {
                        return false;
                    }
                }
            );
        }
        return null;
    }

    validateCode(code: AbstractControl) {
        if (code.value) {
            this.productosService.getCode(code.value).subscribe(res => {

            });
        }
    }

    ngOnInit() {
        this.productosForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(1), this.ValidateCpf.bind(this)]],
            name: ['', [Validators.required, Validators.minLength(3)]],
            stock: ['', [Validators.required, Validators.min(1)]],
            price: ['', [Validators.required, Validators.min(1)]]
        });

    }

    get f() {
        return this.productosForm.controls;
    }

}
