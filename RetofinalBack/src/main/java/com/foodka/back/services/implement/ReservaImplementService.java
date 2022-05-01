package com.foodka.back.services.implement;

import com.foodka.back.domain.collection.Reserva;
import com.foodka.back.domain.dto.ReservaDTO;
import com.foodka.back.repository.ReservaRepository;
import com.foodka.back.services.EmailService;
import com.foodka.back.services.ReservaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservaImplementService implements ReservaService {

    @Autowired
    ReservaRepository reservaRepository;

    @Autowired
    EmailService emailService;

    ModelMapper modelMapper = new ModelMapper();

    private static final String EMAIL_ADMINISTRADOR = "restaurantefoodka@gmail.com";

    @Override
    public Mono<ReservaDTO> save(ReservaDTO reservaDTO) {
        return reservaRepository.save(modelMapper.map(reservaDTO, Reserva.class))
                .flatMap(r -> Mono.just(modelMapper.map(r, ReservaDTO.class)));
    }

    @Override
    public Mono<ReservaDTO> findById(String id) {
        return reservaRepository.findById(id)
                .flatMap(r -> Mono.just(modelMapper.map(r, ReservaDTO.class)))
                .switchIfEmpty(Mono.empty());
    }

    @Override
    public Flux<ReservaDTO> findAll() {
        return reservaRepository.findAll()
                .flatMap(r -> Mono.just(modelMapper.map(r, ReservaDTO.class)));
    }

    @Override
    public Mono<ReservaDTO> delete(String id) {
        return findById(id)
                .flatMap(r -> reservaRepository.deleteById(r.getId()).thenReturn(r));
    }

    @Override
    public Mono<ReservaDTO> update(String id, ReservaDTO reservaDTO) {
        return findById(id).
                flatMap(rDto -> {
                    reservaDTO.setId(rDto.getId());
                    return save(reservaDTO);
                })
                .switchIfEmpty(Mono.empty());
    }

    @Override
    public Mono<String> sendConfirmationEmail(ReservaDTO reservaDTO) {
        emailService.sendEmailMessage(
                EMAIL_ADMINISTRADOR,
                String.format("Reserva confirmada restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día señor administrador, %n%n" +
                                "Se acaba de realizar la siguiente reserva:%n%n" +
                                "Código: %s%n" +
                                "Fecha: %s%n" +
                                "Hora: %s%n" +
                                "Nombre de quien reserva: %s %s%n" +
                                "Cantidad de Personas: %d%n" +
                                "Teléfono: %s%n" +
                                "Email: %s%n" +
                                "Pedido: %s",
                        reservaDTO.getId(),
                        reservaDTO.getDia(),
                        reservaDTO.getHora(),
                        reservaDTO.getCliente().getNombre(),
                        reservaDTO.getCliente().getApellido(),
                        reservaDTO.getCantidadPersonas(),
                        reservaDTO.getTelefono(),
                        reservaDTO.getCliente().getEmail(),
                        reservaDTO.getMensaje()));

        return emailService.sendEmailMessage(
                reservaDTO.getCliente().getEmail(),
                String.format("Confirmación de Reserva Restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día %s, %n" +
                                "Su reserva fue confirmada para el día %s, hora %s para %d personas. %n" +
                                "Su pedido fue: %s. %n%n" +
                                "Tienes hasta dos horas antes de tu reserva para cancelar o modificar la misma. %n" +
                                "¡Los esperamos!",
                        reservaDTO.getCliente().getNombre().toUpperCase(),
                        reservaDTO.getDia(),
                        reservaDTO.getHora(),
                        reservaDTO.getCantidadPersonas(),
                        reservaDTO.getMensaje()));
    }

    @Override
    public Mono<String> sendModificationEmail(ReservaDTO reservaDTO) {
        emailService.sendEmailMessage(
                EMAIL_ADMINISTRADOR,
                String.format("Reserva modificada restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día señor administrador, %n%n" +
                                "Se acaba de realizar una modificación en la siguiente reserva:%n%n" +
                                "Código: %s%n" +
                                "Fecha: %s%n" +
                                "Hora: %s%n" +
                                "Nombre de quien reserva: %s %s%n" +
                                "Cantidad de Personas: %d%n" +
                                "Teléfono: %s%n" +
                                "Email: %s%n" +
                                "Pedido: %s",
                        reservaDTO.getId(),
                        reservaDTO.getDia(),
                        reservaDTO.getHora(),
                        reservaDTO.getCliente().getNombre(),
                        reservaDTO.getCliente().getApellido(),
                        reservaDTO.getCantidadPersonas(),
                        reservaDTO.getTelefono(),
                        reservaDTO.getCliente().getEmail(),
                        reservaDTO.getMensaje()));

        return emailService.sendEmailMessage(
                reservaDTO.getCliente().getEmail(),
                String.format("Modificación de Reserva Restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día %s, %n" +
                                "Su reserva fue modificada %n " +
                                "Sus reserva quedo actualmente asi: %n" +
                                "- Para el día %s, hora %s para %d personas. %n" +
                                "- Su pedido fue: %s. %n%n" +
                                "Tienes hasta dos horas antes de tu reserva para cancelar o modificar la misma. %n" +
                                "¡Los esperamos!",
                        reservaDTO.getCliente().getNombre().toUpperCase(),
                        reservaDTO.getDia(),
                        reservaDTO.getHora(),
                        reservaDTO.getCantidadPersonas(),
                        reservaDTO.getMensaje()));
    }

    @Override
    public Mono<String> sendDeleteEmail(ReservaDTO reservaDTO) {
        emailService.sendEmailMessage(
                EMAIL_ADMINISTRADOR,
                String.format("Reserva cancelada restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día señor administrador, %n%n" +
                                "El cliente cancelo la siguiente reserva:%n%n" +
                                "Código: %s%n" +
                                "Fecha: %s%n" +
                                "Hora: %s%n" +
                                "Nombre de quien reserva: %s %s%n" +
                                "Cantidad de Personas: %d%n" +
                                "Teléfono: %s%n" +
                                "Email: %s%n" +
                                "Pedido: %s",
                        reservaDTO.getId(),
                        reservaDTO.getDia(),
                        reservaDTO.getHora(),
                        reservaDTO.getCliente().getNombre(),
                        reservaDTO.getCliente().getApellido(),
                        reservaDTO.getCantidadPersonas(),
                        reservaDTO.getTelefono(),
                        reservaDTO.getCliente().getEmail(),
                        reservaDTO.getMensaje()));
        return emailService.sendEmailMessage(
                reservaDTO.getCliente().getEmail(),
                String.format("Eliminación de Reserva Restaurante FOODKA Código: %s", reservaDTO.getId()),
                String.format("Buen día %s, %n" +
                                "Su reserva con código %s fue cancelada. %n%n" +
                                "¡Los esperamos en una próxima ocasión!",
                        reservaDTO.getCliente().getNombre().toUpperCase(),
                        reservaDTO.getId()));
    }

    @Override
    public Mono<List<String>> findByDia(String dia) {
        return reservaRepository.findByDia(dia)
                .flatMap(reservas -> Mono.just(modelMapper.map(reservas, ReservaDTO.class).getHora()))
                .collectList();
    }
}

