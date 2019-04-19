package de.htrinter.ssedemo.service

import de.htrinter.ssedemo.domain.JobData
import de.htrinter.ssedemo.domain.JobExitCode
import de.htrinter.ssedemo.domain.JobStatus
import org.slf4j.LoggerFactory
import org.springframework.messaging.SubscribableChannel
import org.springframework.messaging.support.GenericMessage
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class MockJobRunnerService(private var jobDataChannel: SubscribableChannel) {

  private val LOG = LoggerFactory.getLogger(MockJobRunnerService::class.java)
  private val MAX_RUNNING_JOBS = 6

  private val random = Random()
  private val runningJobList = Collections.synchronizedList(ArrayList<JobData>())
  private var totalJobCount: Long = 0;

  @Scheduled(fixedDelay = 200)
  fun updateJobs() {
    // Schedule job if we are running out
    if (runningJobList.size < MAX_RUNNING_JOBS) {
      totalJobCount++;
      val newJobData = JobData(UUID.randomUUID().toString(), "Long running job #$totalJobCount");
      runningJobList.add(newJobData)
      LOG.debug("Job added, id=%s".format(newJobData.id))
    }

    // Update one of the existing jobs
    val jobIndex = random.nextInt(runningJobList.size)
    val jobData = runningJobList.get(jobIndex)

    val completionInc = random.nextInt(30)
    if (jobData.completionPercentage + completionInc > 100) {
      jobData.completionPercentage = 100
      jobData.status = JobStatus.FINISHED
      jobData.exitCode = JobExitCode.SUCCESS
      runningJobList.removeAt(jobIndex);
      LOG.debug("Job completed, id=%s, exitCode=%s".format(jobData.id, jobData.exitCode))
    } else {
      jobData.completionPercentage += completionInc
      jobData.status = JobStatus.IN_PROGRESS
      LOG.debug("Job progress incremented, id=%s, completionPercentage=%s".format(jobData.id, jobData.completionPercentage))
    }

    jobDataChannel.send(GenericMessage<JobData>(jobData))
  }

}