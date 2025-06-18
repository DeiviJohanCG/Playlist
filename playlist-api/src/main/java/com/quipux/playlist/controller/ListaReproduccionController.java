package com.quipux.playlist.controller;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quipux.playlist.entity.ListaReproduccion;
import com.quipux.playlist.service.ListaReproduccionService;

/**
 * 
 * @author deivi
 *
 */
@RestController
@RequestMapping("/lists")
public class ListaReproduccionController {
	@Autowired
    private ListaReproduccionService service;

    @PostMapping
    public ResponseEntity<ListaReproduccion> crearLista(@RequestBody ListaReproduccion lista) {
        try {
            ListaReproduccion listaCreada = service.crearLista(lista);
            String encodedName = URLEncoder.encode(listaCreada.getNombre(), StandardCharsets.UTF_8);
            URI location = URI.create("/lists/" + encodedName);
            return ResponseEntity.created(location).body(listaCreada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
