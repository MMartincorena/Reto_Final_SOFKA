package com.foodka.back.repository;

import com.foodka.back.domain.collection.Reserva;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ReservaRepository extends ReactiveMongoRepository<Reserva, String> {
    Flux<Reserva> findByDia(String dia);
}
