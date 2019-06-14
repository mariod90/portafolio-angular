import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {
  info: infoPagina[] = [];
  cargada = false;
  equipo: any[] = [];
  constructor( private http:HttpClient ) {
    this.cargarInfo();
    this.cargarTeam();
  }

  private cargarInfo(){
    //Leer .json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: infoPagina[]) => {
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarTeam(){
    //Leer .json desde firebase
    this.http.get('https://angular-html-9636b.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {
      this.equipo = resp;
    });
  }
}
