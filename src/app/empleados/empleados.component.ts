import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewEmpleadoComponent } from '../new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from '../editEmpleado/edit-empleado/edit-empleado.component';
import axios from 'axios';
import { ViewChild, TemplateRef } from '@angular/core';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  bsModalRef: BsModalRef | null = null;
  modalService: BsModalService;
  searchText: string = '';
  empleados: any;
  catalogos: any;
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
  
  constructor(private empleadoService: EmpleadoService, modalService: BsModalService) {
    this.modalService = modalService;
  }
  confirmDelete(): void {
    if (this.employeeIdToDelete !== null) {
      this.empleadoService.deleteEmpleado(this.employeeIdToDelete).subscribe(() => {
        // Actualiza la lista de empleados después de eliminar uno
        this.showEmpleados();
      });
      if (this.bsModalRef) {
        this.bsModalRef.hide();
      }
    }
  }
  ngOnInit(): void {
    this.showEmpleados();
    axios.get<any[]>('/api/empleados')
    .then(response => {
      this.empleados = response.data;
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  deleteEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(() => {
      // Actualiza la lista de empleados después de eliminar uno
      this.employeeIdToDelete = id;
      this.bsModalRef = this.modalService.show(this.confirmTemplate);
    });
  }

  openModal() {

    this.bsModalRef = this.modalService.show(NewEmpleadoComponent,this.config);
  }
  openModal2(id: number) {
    this.bsModalRef = this.modalService.show(EditEmpleadoComponent, {
      initialState: {
        id: id
      },
      class: 'my-modal'
    });
    
  }

  showEmpleados(): void {
    this.empleadoService.listEmpleados().subscribe(empleado => {
      this.empleados = empleado;
      console.log(this.empleados);
    });
  }
  showCatalogo(): void {
    this.empleadoService.listCatalogo().subscribe(catalogo => {
      this.catalogos = catalogo;
      console.log(this.catalogos);
    });
  }
  search(): void {
    if (this.searchText) {
      this.empleados = this.empleados.filter((empleado: any) =>
        empleado.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.correo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.telefono.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.direccion.nombre_departamento.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.direccion.nombre_municipio.toLowerCase().includes(this.searchText.toLowerCase()) ||
        empleado.direccion.ubicacion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If the search text is empty, show all employees again
      this.showEmpleados();
      this.showCatalogo();
    }
  }
  sortData(field: string) {
    this.empleados.sort((a: any, b: any) => {
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
