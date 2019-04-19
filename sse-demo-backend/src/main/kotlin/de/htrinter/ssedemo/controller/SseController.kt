package de.htrinter.ssedemo.controller

import de.htrinter.ssedemo.domain.JobData
import org.springframework.http.codec.ServerSentEvent
import org.springframework.messaging.MessageHandler
import org.springframework.messaging.SubscribableChannel
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import reactor.core.publisher.Flux
import java.time.Duration


@Controller
@RequestMapping("/api/event")
class SseController(private var jobDataChannel: SubscribableChannel) {

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

  @CrossOrigin(origins = ["http://localhost:3000"])
  @GetMapping("/jobstatus")
  fun streamJobStatus(): Flux<ServerSentEvent<JobData>> {
    return Flux.create<ServerSentEvent<JobData>> { sink ->
      val messageHandler = MessageHandler { message ->
        val jobData: JobData = message.payload as JobData;
        sink.next(ServerSentEvent.builder<JobData>()
                .id(jobData.id)
                .event("message")
                .data(jobData)
                .build())
      }
      jobDataChannel.subscribe(messageHandler)
    }
  }
}