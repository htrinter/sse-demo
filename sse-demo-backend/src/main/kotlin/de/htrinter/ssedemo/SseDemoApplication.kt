package de.htrinter.ssedemo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SseDemoApplication

fun main(args: Array<String>) {
	runApplication<SseDemoApplication>(*args)
}
