package com.foodka.back.services;

import com.foodka.back.domain.dto.ReservaDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ReservaService {

    Mono<ReservaDTO> save(ReservaDTO reservaDTO);
    Mono<ReservaDTO> findById(String id);
    Flux<ReservaDTO> findAll();
    Mono<ReservaDTO> delete(String id);
    Mono<ReservaDTO> update(String id, ReservaDTO reservaDTO);
    Mono<String> sendConfirmationEmail(ReservaDTO reservaDTO);
    Mono<String> sendModificationEmail(ReservaDTO reservaDTO);
    Mono<String> sendDeleteEmail(ReservaDTO reservaDTO);
    Mono<List<String>> findByDia(String dia);


}
