package de.htrinter.ssedemo.controller

import org.springframework.http.codec.ServerSentEvent
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import reactor.core.publisher.Flux
import java.time.Duration


@Controller
@RequestMapping("/api/event")
class SseController {

  @GetMapping("/hello-world")
  fun streamHelloWorld(): Flux<ServerSentEvent<String>> {
    return Flux.interval(Duration.ofSeconds(1))
            .map { sequence ->
              ServerSentEvent.builder<String>()
                      .id(sequence.toString())
                      .event("hello-world")
                      .data("Hello World #$sequence!")
                      .build()
            }
  }
}