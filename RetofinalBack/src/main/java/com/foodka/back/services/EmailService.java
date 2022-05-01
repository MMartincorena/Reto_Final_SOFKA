package com.foodka.back.services;

import reactor.core.publisher.Mono;

public interface EmailService {
    Mono<String> sendEmailMessage(String to, String subject, String text);
}
