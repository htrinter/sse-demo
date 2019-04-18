package de.htrinter.ssedemo.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.integration.dsl.MessageChannels
import org.springframework.messaging.SubscribableChannel

@Configuration
class ChannelConfiguration {

  @Bean
  fun jobDataChannel(): SubscribableChannel {
    return MessageChannels.publishSubscribe().get()
  }

}