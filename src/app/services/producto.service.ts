import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listProductos(): Observable<any[]> {
    
    const params = new HttpParams().set('nombre', 'nombre');
    return this.http.get<any[]>(this.url + '/api/productos', { params: params });
  } 
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addProducto(empleado: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/productos', empleado, this.httpOptions);
  }
  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/productos/${id}`);
  }
  updateProducto(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.url}/api/productos/${id}`, empleado, this.httpOptions);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/productos/${id}`, this.httpOptions);
  }
}
