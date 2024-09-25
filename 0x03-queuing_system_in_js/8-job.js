/* Writing the job creation function */
function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
      throw Error('Jobs is not an array');
    }
  
    jobs.forEach((theJob) => {
      const StJob = queue.create('push_notification_code_3', theJob);
      StJob.save((erro) => {
        if (!erro) console.log(`Notification job created: ${StJob.id}`);
      });
      StJob.on('complete', function() {
        console.log(`Notification job ${StJob.id} completed`);
      });
      StJob.on('progress', function(prog) {
        console.log(`Notification job ${StJob.id} ${prog}% complete`);
      });
      StJob.on('failed', function(erro) {
        console.log(`Notification job ${StJob.id} failed: ${erro}`);
      });
    });
  }
  
  module.exports = createPushNotificationsJobs;
