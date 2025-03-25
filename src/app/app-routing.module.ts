import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEmpleadoComponent } from './new-empleado/new-empleado.component';
const routes: Routes = [
  {
  path:'add', component: NewEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
