package com.quipux.playlist.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.quipux.playlist.entity.Cancion;
import com.quipux.playlist.entity.ListaReproduccion;
import com.quipux.playlist.repository.ListaReproduccionRepository;

/**
 * 
 * @author deivi
 *
 */
@Service
public class ListaReproduccionService {
	private final ListaReproduccionRepository repo;

    public ListaReproduccionService(ListaReproduccionRepository repo) {
        this.repo = repo;
    }

    public ListaReproduccion crearLista(ListaReproduccion lista) {
        if (lista.getNombre() == null || lista.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre de la lista no puede ser nulo o vacío");
        }

        String nombreSanitizado = sanitizarTexto(lista.getNombre());
        String descripcionSanitizada = sanitizarTexto(lista.getDescripcion());

        if (!esTextoValido(nombreSanitizado) || !esTextoValido(descripcionSanitizada)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre o descripción con caracteres inválidos");
        }

        List<Cancion> cancionesSanitizadas = lista.getCanciones().stream().map(c -> {
            String titulo = sanitizarTexto(c.getTitulo());
            String artista = sanitizarTexto(c.getArtista());
            String album = sanitizarTexto(c.getAlbum());
            String anno = sanitizarTexto(c.getAnno());
            String genero = sanitizarTexto(c.getGenero());

            if (titulo.isBlank() || artista.isBlank() || album.isBlank() || anno.isBlank() || genero.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Todos los campos de la canción son obligatorios");
            }

            if (!esTextoValido(titulo) || !esTextoValido(artista) || !esTextoValido(album)
                    || !esTextoValido(anno) || !esTextoValido(genero)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campos de canción con caracteres inválidos");
            }

            return new Cancion(null, titulo, artista, album, anno, genero);
        }).collect(Collectors.toList());

        ListaReproduccion listaSanitizada = new ListaReproduccion();
        listaSanitizada.setNombre(nombreSanitizado);
        listaSanitizada.setDescripcion(descripcionSanitizada);
        listaSanitizada.setCanciones(cancionesSanitizadas);

        return repo.save(listaSanitizada);
    }
    
    public List<ListaReproduccion> obtenerListas() {
        return repo.findAll();
    }
    
    private String sanitizarTexto(String texto) {
        if (texto == null) return "";
        return texto
            .replaceAll("[<>\"'`]", "")
            .replaceAll("\\s+", " ")
            .trim();
    }

    private boolean esTextoValido(String texto) {
        return texto.matches("^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ.,:;()¡!¿?\"'\\-]{1,200}$");
    }
}
