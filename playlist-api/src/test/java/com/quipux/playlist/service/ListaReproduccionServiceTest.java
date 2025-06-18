package com.quipux.playlist.service;

import com.quipux.playlist.entity.Cancion;
import com.quipux.playlist.entity.ListaReproduccion;
import com.quipux.playlist.repository.ListaReproduccionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * 
 * @author deivi
 *
 */
class ListaReproduccionServiceTest {

    private ListaReproduccionRepository repository;
    private ListaReproduccionService service;

    @BeforeEach
    void setUp() {
        repository = mock(ListaReproduccionRepository.class);
        service = new ListaReproduccionService(repository);
    }

    @Test
    void crearLista_DeberiaCrearCorrectamente() {
        ListaReproduccion lista = new ListaReproduccion(
                "Lista 1", "Descripcion de prueba",
                List.of(new Cancion(null, "Cancion", "Artista", "Album", "2000", "Genero"))
        );

        when(repository.save(lista)).thenReturn(lista);

        ListaReproduccion creada = service.crearLista(lista);

        assertNotNull(creada);
        assertEquals("Lista 1", creada.getNombre());
        verify(repository).save(lista);
    }

    @Test
    void crearLista_DeberiaLanzarExcepcion_SiNombreEsNull() {
        ListaReproduccion lista = new ListaReproduccion(
                null, "Descripción", List.of()
        );

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            service.crearLista(lista);
        });

        assertEquals("El nombre de la lista no puede ser nulo o vacío", ex.getMessage());
    }

    @Test
    void obtenerListaPorNombre_DeberiaRetornarLista() {
        ListaReproduccion lista = new ListaReproduccion("rock", "Rock clásico", List.of());
        when(repository.findById("rock")).thenReturn(Optional.of(lista));

        ListaReproduccion resultado = service.obtenerListaPorNombre("rock");

        assertNotNull(resultado);
        assertEquals("rock", resultado.getNombre());
    }
    
    @Test
    void obtenerListaPorNombre_DeberiaLanzarExcepcion_SiNoExiste() {
        String nombreLista = "inexistente";

        when(repository.findById(nombreLista)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> {
            service.eliminarLista("no-existe");
        });
        
        assertEquals("La lista no existe", ex.getReason());
    }

    @Test
    void eliminarLista_DeberiaEliminarCorrectamente() {
        when(repository.existsById("pop")).thenReturn(true);

        service.eliminarLista("pop");

        verify(repository).deleteById("pop");
    }

    @Test
    void eliminarLista_DeberiaLanzarExcepcion_SiNoExiste() {
        when(repository.existsById("no-existe")).thenReturn(false);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> {
            service.eliminarLista("no-existe");
        });
        
        assertEquals("La lista no existe", ex.getReason());
    }
}
