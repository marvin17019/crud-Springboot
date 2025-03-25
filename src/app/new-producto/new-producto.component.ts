import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent {
  newProductoForm!: FormGroup;
  bsModalRef: BsModalRef;
  nombreCounter = 50;
  descripcion = 100;
  precio = 50;
  stock = 10;
  errorMensaje: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) {
    this.bsModalRef = bsModalRef;
  }

  ngOnInit(): void {
    this.newProductoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Permite decimales con hasta 2 dígitos
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]], // Solo números enteros y mínimo 1
      tipo_Producto: ['', Validators.required]
      
    });
  }

  
  onSubmit() {
    
    // Add the new employee using the values from the form
    console.log(this.newProductoForm.value)
    this.productoService.addProducto(this.newProductoForm.value).subscribe(
      response => {
        // Employee created successfully
        this.toastr.success('El producto se ha añadido correctamente.', 'Éxito');
        // Close the modal
        this.bsModalRef.hide();
        // Reload the page to display the latest user
        window.location.reload();
        console.log(response);
      },
      error => {
        this.errorMensaje = 'Llene el formulario porfavor';
        console.error(error);
      }
    );
  }
  cancel() {
    this.bsModalRef.hide();
  }
  updateNombreCounter() {
    const nombreValue = this.newProductoForm.get('nombre')?.value || '';
    const descripcionValue = this.newProductoForm.get('descripcion')?.value || '';
    const precioValue = this.newProductoForm.get('precio')?.value || '';
    const stockValue = this.newProductoForm.get('stock')?.value || '';
    const tipo_ProductoValue = this.newProductoForm.get('tipo_Producto')?.value || '';
  }
  onKeyPress(event: KeyboardEvent) {
    // Prevent the default behavior if the pressed key is not a letter or space
    if (!event.key.match(/[a-zA-Z ]/)) {
      event.preventDefault();
    }
  }
  onKeyPressTelefono(event: KeyboardEvent) {
    // Prevent the default behavior if the pressed key is not a number
    if (!event.key.match(/[0-9]/)) {
      event.preventDefault();
    }
  }
}
