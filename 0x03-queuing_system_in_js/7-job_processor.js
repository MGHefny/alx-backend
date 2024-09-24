/* Create the Job processor*/
import { createQueue } from 'kue';

const order = createQueue();
const blackLnumb = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    //prog 0.100
  job.progress(0, 100);
  if (blackLnumb.some((number) => number === phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }
  //prog 0.100
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

order.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
