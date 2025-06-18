package com.quipux.playlist.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @author deivi
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ListaReproduccion {
    @Id
    private String nombre;

    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cancion> canciones;
}
