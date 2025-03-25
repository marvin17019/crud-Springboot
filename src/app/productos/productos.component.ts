import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewEmpleadoComponent } from '../new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from '../editEmpleado/edit-empleado/edit-empleado.component';
import axios from 'axios';
import { ViewChild, TemplateRef } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { NewProductoComponent } from '../new-producto/new-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  bsModalRef: BsModalRef | null = null;
  modalService: BsModalService;
  searchText: string = '';
  productos: any;
  p: number = 1;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal",


  };
  @ViewChild('confirmTemplate', { static: false }) confirmTemplate!: TemplateRef<any>;
  employeeIdToDelete: number | null = null;

  constructor(private productoService: ProductoService, modalService: BsModalService) {
    this.modalService = modalService;
  }
  ngOnInit(): void {
    this.showProductos();
    axios.get<any[]>('/api/productos')
      .then(response => {
        this.productos = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  showProductos(): void {
    this.productoService.listProductos().subscribe(producto => {
      this.productos = producto;
    });
  }
  confirmDelete(): void {
    if (this.employeeIdToDelete !== null) {
      this.productoService.deleteProducto(this.employeeIdToDelete).subscribe(() => {
        // Actualiza la lista de empleados después de eliminar uno
        
      });
      if (this.bsModalRef) {
        this.showProductos();
        this.bsModalRef.hide();
      }
    }
  }
  openModal() {
    this.bsModalRef = this.modalService.show(NewProductoComponent,this.config);
  }
  search(): void {
    if (this.searchText) {
      this.productos = this.productos.filter((producto: any) =>
        producto.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) ||
        producto.precio.toLowerCase().includes(this.searchText.toLowerCase()) ||
        producto.stock.toLowerCase().includes(this.searchText.toLowerCase()) ||
        producto.tipo_Producto.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If the search text is empty, show all employees again
      this.showProductos();
    }
  }

  deleteEmpleado(id: number): void {
    this.productoService.deleteProducto(id).subscribe(() => {
      // Actualiza la lista de empleados después de eliminar uno
      this.employeeIdToDelete = id;
      this.bsModalRef = this.modalService.show(this.confirmTemplate);
    });
  }
  sortData(field: string) {
    this.productos.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
