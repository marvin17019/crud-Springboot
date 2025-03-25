import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.css']
})
export class NewEmpleadoComponent {
  newEmpleadoForm!: FormGroup;
  bsModalRef: BsModalRef;
  nombreCounter = 50;
  apellidoCounter = 50;
  correoCounter = 50;
  telefonoCounter = 8;
  ubicacionCounter = 230;
  departments: any[]=[];
  municipalities: any[] = [];
  errorMensaje: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) {
    this.bsModalRef = bsModalRef;
  }

  ngOnInit(): void {
    this.newEmpleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8)]],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required]
      
    });

    this.fetchCatalogData();
  }

  fetchCatalogData() {
    this.empleadoService.listCatalogo().subscribe(
      response => {
        // Filter the response to get only the departments
        // this.departments = response.filter(item => item.grupo === 'Departamento');
        this.departments = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  onDepartmentChange(departmentName: string) {
    // Find the selected department by its name
    const selectedDepartment = this.departments.find(department => department.nombre === departmentName);
    console.log("Departamento:"+selectedDepartment.nombre);
    this.municipalities = selectedDepartment.municipios;
    // if (selectedDepartment) {
    //   // Call the listCatalogo method to get all the data again
    //   this.empleadoService.listCatalogo().subscribe(
    //     response => {
    //       // Filter the response to get only the municipalities with the same id_padre as the selected department id
    //       this.municipalities = response.filter(item => item.grupo === 'Municipio' && item.id_padre === selectedDepartment.id);
    //       this.municipalities = response.municipios;
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   );
    // }
  }
  
  onSubmit() {
    
    // Add the new employee using the values from the form
    console.log(this.newEmpleadoForm.value)
    this.empleadoService.addEmpleado(this.newEmpleadoForm.value).subscribe(
      response => {
        // Employee created successfully
        this.toastr.success('El empleado se ha añadido correctamente.', 'Éxito');
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
    const nombreValue = this.newEmpleadoForm.get('nombre')?.value || '';
    const apellidoValue = this.newEmpleadoForm.get('apellido')?.value || '';
    const correoValue = this.newEmpleadoForm.get('correo')?.value || '';
    const telefonoValue = this.newEmpleadoForm.get('telefono')?.value || '';
    const ubicacionValue = this.newEmpleadoForm.get('ubicacion')?.value || '';
    this.nombreCounter = 50 - nombreValue.length;
    this.apellidoCounter = 50 - apellidoValue.length;
    this.correoCounter = 50 - correoValue.length;
    this.telefonoCounter = 8 - telefonoValue.length;
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