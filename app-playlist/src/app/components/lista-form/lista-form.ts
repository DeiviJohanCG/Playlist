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
    this.obtenerListas();
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

  eliminarCancion(index: number): void {
    this.nuevaLista.canciones.splice(index, 1);
  }

  crearLista(): void {
    this.mensaje = '';

    const nombre = this.sanitizarTexto(this.nuevaLista.nombre);
    const descripcion = this.sanitizarTexto(this.nuevaLista.descripcion);

    if (!nombre || !descripcion) {
      this.mensaje = 'Debes ingresar el nombre y la descripción de la lista.';
      return;
    }

    if (!this.esTextoValido(nombre) || !this.esTextoValido(descripcion)) {
      this.mensaje = 'El nombre o la descripción contienen caracteres inválidos.';
      return;
    }

    if (this.nuevaLista.canciones.length === 0) {
      this.mensaje = 'Debes agregar al menos una canción a la lista.';
      return;
    }

    const listaSanitizada: ListaReproduccion = {
      nombre,
      descripcion,
      canciones: this.nuevaLista.canciones
    };

    this.apiService.crearLista(listaSanitizada).subscribe({
      next: (listaCreada) => {
        this.mensaje = `Lista "${listaCreada.nombre}" creada exitosamente.`;

        this.nuevaLista = {
          nombre: '',
          descripcion: '',
          canciones: []
        };
        this.nuevaCancion = {
          titulo: '',
          artista: '',
          album: '',
          anno: '',
          genero: ''
        };

        this.obtenerListas();
      },
      error: (error) => {
        this.mensaje = 'Error al crear la lista.';
        console.error(error);
      }
    });
  }

  obtenerListas(): void {
    this.apiService.listarTodas().subscribe({
      next: (listas) => this.listas = listas,
      error: (err) => {
        this.mensajeLista = 'Error al cargar las listas.';
        console.error(err);
      }
    });
  }

  limpiarFormulario(): void {
    this.nuevaLista = {
      nombre: '',
      descripcion: '',
      canciones: []
    };

    this.nuevaCancion = {
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: ''
    };

    this.mensaje = '';
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
