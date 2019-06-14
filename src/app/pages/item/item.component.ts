import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { DetalleProducto } from '../../interfaces/detalleProducto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: DetalleProducto;
  productoID: string;

  constructor( private route: ActivatedRoute, public productoService: ProductosService ) { }

  ngOnInit() {
    this.route.params
    .subscribe(parametros => {
      this.productoService.getProducto(parametros['id'])
      .subscribe((productoResult: DetalleProducto) => {
        this.productoID = parametros['id'];        
        this.producto = productoResult;
      });
    });
  }

}
