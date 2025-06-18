import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cancion {
  titulo: string;
  artista: string;
  album: string;
  anno: string;
  genero: string;
}

export interface ListaReproduccion {
  nombre: string;
  descripcion: string;
  canciones: Cancion[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/lists';

  private username = 'admin';
  private password = 'admin123';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    })
  };

  constructor(private http: HttpClient) {}

  crearLista(lista: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(this.apiUrl, lista, this.httpOptions);
  }

  listarTodas(): Observable<ListaReproduccion[]> {
    return this.http.get<ListaReproduccion[]>(this.apiUrl, this.httpOptions);
  }
}
