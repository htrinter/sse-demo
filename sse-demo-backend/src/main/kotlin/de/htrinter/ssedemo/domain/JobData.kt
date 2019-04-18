package de.htrinter.ssedemo.domain

data class JobData(val id: String,
                   val description: String) {

  var completionPercentage = 0
  var status = JobStatus.NEW
  var exitCode = JobExitCode.NONE

}