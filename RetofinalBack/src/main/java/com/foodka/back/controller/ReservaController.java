package com.foodka.back.controller;

import com.foodka.back.domain.dto.ReservaDTO;
import com.foodka.back.domain.values.Cliente;
import com.foodka.back.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reserva")
public class ReservaController {

    @Autowired
    ReservaService reservaService;

    @PostMapping
    public Mono<ResponseEntity<ReservaDTO>> save(@RequestBody ReservaDTO reservaDTO) {
        if (reservaDTO.getCliente() == null && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return (reservaService.save(reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva))));
        } else if (validateEmail(reservaDTO.getCliente()) && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return (reservaService.save(reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva))));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        }
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ReservaDTO>> findById(@PathVariable("id") String id) {
        return reservaService.findById(id)
                .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
    }

    @GetMapping
    public ResponseEntity<Flux<ReservaDTO>> findAll() {
        return new ResponseEntity<Flux<ReservaDTO>>(reservaService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<ReservaDTO>> delete(@PathVariable("id") String id) {
        return reservaService.delete(id)
                .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<ReservaDTO>> update(@PathVariable("id") String id, @RequestBody ReservaDTO reservaDTO) {
        if (validateEmail(reservaDTO.getCliente()) && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return reservaService.update(id, reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                    .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        }
    }

    @PostMapping("/sendEmail")
    public Mono<ResponseEntity<String>> sendEmail(@RequestBody ReservaDTO reservaDTO) {
        if (validateEmail(reservaDTO.getCliente()) && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return reservaService.sendConfirmationEmail(reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                    .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        }
    }

    @PostMapping("/sendEmailModification")
    public Mono<ResponseEntity<String>> sendEmailModification(@RequestBody ReservaDTO reservaDTO) {
        if (validateEmail(reservaDTO.getCliente()) && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return reservaService.sendModificationEmail(reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                    .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        }
    }
    @PostMapping("/sendEmailDelete")
    public Mono<ResponseEntity<String>> sendEmailDelete(@RequestBody ReservaDTO reservaDTO) {
        if (validateEmail(reservaDTO.getCliente()) && validateFechaYHora(reservaDTO.getDia(), reservaDTO.getHora())) {
            return reservaService.sendDeleteEmail(reservaDTO)
                    .flatMap(reserva -> Mono.just(ResponseEntity.ok(reserva)))
                    .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        }
    }

    @GetMapping("/findByDia/{dia}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<List<String>> findByDia(@PathVariable("dia") String dia) {
        return reservaService.findByDia(dia);
    }

    public static boolean validateEmail(Cliente cliente) {
        try {
            Pattern pattern = Pattern
                    .compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
            Matcher matcher = pattern.matcher(cliente.getEmail());
            return matcher.find();
        } catch (Exception e) {
            return false;
        }

    }

    public static boolean validateFechaYHora(String dia, String hora) {
        try {
            Date fecha = new SimpleDateFormat("M/d/yyyy").parse(dia);
            String fechanueva = new SimpleDateFormat("M/d/yyyy").format(fecha);
            Date hora2 = new SimpleDateFormat("HH:mm").parse(hora);
            String horaNueva = new SimpleDateFormat("HH:mm").format(hora2);
            return (fechanueva.equals(dia) && horaNueva.equals(hora));
        } catch (Exception e) {
            return false;
        }
    }
}
