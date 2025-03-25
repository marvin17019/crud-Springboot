import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute,Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})

export class EditEmpleadoComponent implements OnInit {
  editEmpleadoForm!: FormGroup;
  id!: number;
  departments: any[] = [];
  municipalities: any[] = [];
  nombreCounter = 50;
  apellidoCounter = 50;
  correoCounter = 50;
  telefonoCounter = 8;
  ubicacionCounter = 230;
  errorMensaje: string = '';
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) {}
  
  ngOnInit(): void {
    this.editEmpleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8)]],
      nombre_departamento: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      nombre_municipio: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required]
    });

    // Retrieve the employee's information using the id passed in from the EmpleadosComponent
    this.empleadoService.getEmpleado(this.id).subscribe(empleado => {
      // Populate the form fields with the employee's current values
      this.editEmpleadoForm.patchValue({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        correo: empleado.correo,
        telefono: empleado.telefono,
        nombre_departamento: empleado.direccion.nombre_departamento,
        nombre_municipio: empleado.direccion.nombre_municipio,
        ubicacion: empleado.direccion.ubicacion
      });
    });
     // Retrieve the employee's information using the id passed in from the EmpleadosComponent
  this.empleadoService.getEmpleado(this.id).subscribe(empleado => {
    // Populate the form fields with the employee's current values
    this.editEmpleadoForm.patchValue({
      // ...
    });

    // Call onDepartmentChange with the value of nombre_departamento to populate the list of municipalities
    this.onDepartmentChange(this.editEmpleadoForm.get('nombre_departamento')?.value);
  });
    this.fetchCatalogData();
  }
  fetchCatalogData() {
    this.empleadoService.listCatalogo().subscribe(
      response => {
        // Filter the response to get only the departments
        this.departments = response.filter(item => item.grupo === 'Departamento');
      },
      error => {
        console.error(error);
      }
    );
  }
  
  
  onDepartmentChange(departmentName: string) {
    // Find the selected department by its name
    const selectedDepartment = this.departments.find(department => department.valor === departmentName);
    if (selectedDepartment) {
      // Call the listCatalogo method to get all the data again
      this.empleadoService.listCatalogo().subscribe(
        response => {
          // Filter the response to get only the municipalities with the same id_padre as the selected department id
          this.municipalities = response.filter(item => item.grupo === 'Municipio' && item.id_padre === selectedDepartment.id);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  onSubmit() {
    // Update the employee's information using the values from the form
    this.empleadoService.updateEmpleado(this.id, this.editEmpleadoForm.value).subscribe(() => {
      // Close the modal after successfully updating the employee's information
      this.bsModalRef.hide();
      window.location.reload();
    });
  }
  cancel() {
    this.bsModalRef.hide();
  }
  updateNombreCounter() {
    const nombreValue = this.editEmpleadoForm.get('nombre')?.value || '';
    const apellidoValue = this.editEmpleadoForm.get('apellido')?.value || '';
    const correoValue = this.editEmpleadoForm.get('correo')?.value || '';
    const telefonoValue = this.editEmpleadoForm.get('telefono')?.value || '';
    const ubicacionValue = this.editEmpleadoForm.get('ubicacion')?.value || '';
    this.nombreCounter = 50 - nombreValue.length;
    this.apellidoCounter = 50 - apellidoValue.length;
    this.correoCounter = 50 - correoValue.length;
    this.telefonoCounter = 8 - telefonoValue.length;
    this.ubicacionCounter = 230 - ubicacionValue.length;
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