import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductoInterface } from "../interfaces/productos.interface";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  productoFiltrado: ProductoInterface[] = [];
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      //Leer .json desde firebase
      this.http
        .get("https://angular-html-9636b.firebaseio.com/productos_idx.json")
        .subscribe((resp: ProductoInterface[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }
  getProducto(id: string) {
    return this.http.get(
      `https://angular-html-9636b.firebaseio.com/productos/${id}.json`
    );
  }
  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then(() => {
        //Ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }
    });
  }
}
