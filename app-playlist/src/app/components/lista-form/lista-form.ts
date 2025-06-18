import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Cancion, ListaReproduccion } from '../../services/api';

@Component({
  selector: 'app-lista-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-form.html',
  styleUrls: ['./lista-form.css']
})
export class ListaFormComponent implements OnInit {
  nuevaLista: ListaReproduccion = {
    nombre: '',
    descripcion: '',
    canciones: []
  };

  nuevaCancion: Cancion = {
    titulo: '',
    artista: '',
    album: '',
    anno: '',
    genero: ''
  };

  mensaje = '';
  mensajeLista = '';
  listas: ListaReproduccion[] = [];

  nombreBusqueda = '';
  mensajeBusqueda = '';
  listaEncontrada: ListaReproduccion | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  }

  agregarCancion(): void {
    this.mensaje = '';

    const cancionSanitizada: Cancion = {
      titulo: this.sanitizarTexto(this.nuevaCancion.titulo),
      artista: this.sanitizarTexto(this.nuevaCancion.artista),
      album: this.sanitizarTexto(this.nuevaCancion.album),
      anno: this.sanitizarTexto(this.nuevaCancion.anno),
      genero: this.sanitizarTexto(this.nuevaCancion.genero)
    };

    const { titulo, artista, album, anno, genero } = cancionSanitizada;

    if (!titulo || !artista || !album || !anno || !genero) {
      this.mensaje = 'Debes completar todos los campos de la canción.';
      return;
    }

    if (![titulo, artista, album, anno, genero].every(this.esTextoValido)) {
      this.mensaje = 'Algunos campos de la canción contienen caracteres inválidos.';
      return;
    }

    this.nuevaLista.canciones.push(cancionSanitizada);

    this.nuevaCancion = {
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: ''
    };
  }

  sanitizarTexto(texto: string): string {
    return texto
      .trim()
      .replace(/[<>&"'`]/g, '');
  }

  esTextoValido(texto: string): boolean {
    const patron = /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ.,:;()¡!¿?'"-]{1,200}$/;
    return patron.test(texto.trim());
  }
  }
