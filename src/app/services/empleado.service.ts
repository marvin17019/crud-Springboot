import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listEmpleados(): Observable<any[]> {
    
    const params = new HttpParams().set('with', 'direcciones');
    return this.http.get<any[]>(this.url + '/api/empleados', { params: params });
  } 
  listCatalogo(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/api/departamentos');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/empleados', empleado, this.httpOptions);
  }
  getEmpleado(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/empleados/${id}`);
  }
  getMunicipio(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/catalogo/${id}`);
  }
  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.url}/api/empleados/${id}`, empleado, this.httpOptions);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/empleados/${id}`, this.httpOptions);
  }
  
}

