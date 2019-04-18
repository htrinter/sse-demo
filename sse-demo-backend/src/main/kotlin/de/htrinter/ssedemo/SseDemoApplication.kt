package de.htrinter.ssedemo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class SseDemoApplication

fun main(args: Array<String>) {
	runApplication<SseDemoApplication>(*args)
}
