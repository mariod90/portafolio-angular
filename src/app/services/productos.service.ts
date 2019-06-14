import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: ProductoInterface[] = [];
  cargando = true;
  constructor( private http:HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    //Leer .json desde firebase
    this.http.get('https://angular-html-9636b.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductoInterface[]) => {
      this.productos = resp;
      this.cargando = false;
      
    });
  }
}
