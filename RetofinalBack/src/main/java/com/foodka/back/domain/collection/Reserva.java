package com.foodka.back.domain.collection;

import com.foodka.back.domain.values.Cliente;
import com.mongodb.lang.NonNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Document(collection = "reservas")
public class Reserva {

    @Id
    private String id = UUID.randomUUID().toString().substring(0, 10);
    private String mensaje;
    @NonNull
    private String hora;
    @NonNull
    private String dia;
    private Cliente cliente;
    private int cantidadPersonas;
    private String telefono;

    public Reserva() {
    }

    public Reserva(String hora, String dia) {
        this.hora = hora;
        this.dia = dia;
    }

    public Reserva(String mensaje, String hora, String dia, Cliente cliente, int cantidadPersonas, String telefono) {
        this.mensaje = mensaje;
        this.hora = hora;
        this.dia = dia;
        this.cliente = cliente;
        this.cantidadPersonas = cantidadPersonas;
        this.telefono = telefono;
    }

    public Reserva(String id, String mensaje, String hora, String dia, Cliente cliente, int cantidadPersonas, String telefono) {
        this.id = id;
        this.mensaje = mensaje;
        this.hora = hora;
        this.dia = dia;
        this.cliente = cliente;
        this.cantidadPersonas = cantidadPersonas;
        this.telefono = telefono;
    }
}
