import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {
  info: infoPagina;
  cargada = false;
  constructor( private http:HttpClient ) {
    //Leer .json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: infoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp);
    });
  }
}
