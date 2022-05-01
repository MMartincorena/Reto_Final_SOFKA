package com.foodka.back.domain.values;

import lombok.Data;

@Data
public class Cliente {

    private String nombre;
    private String apellido;
    private String email;

    public Cliente() {
    }

    public Cliente(String nombre, String apellido, String email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}
