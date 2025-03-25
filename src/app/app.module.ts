import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { EmpleadosComponent } from './empleados/empleados.component';
import { NewEmpleadoComponent } from './new-empleado/new-empleado.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditEmpleadoComponent } from './editEmpleado/edit-empleado/edit-empleado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { NewProductoComponent } from './new-producto/new-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    NewEmpleadoComponent,
    EditEmpleadoComponent,
    ProductosComponent,
    NewProductoComponent,
    EditProductoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
