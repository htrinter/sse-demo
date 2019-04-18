package de.htrinter.ssedemo.controller

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/api")
class StatusController {

  @GetMapping("/status")
  fun status(): ResponseEntity<String> {
    return ResponseEntity.ok("up")
  }

}