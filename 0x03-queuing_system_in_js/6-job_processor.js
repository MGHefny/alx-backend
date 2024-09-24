/* Create the Job processor*/
import { createQueue } from 'kue';

const order = createQueue();

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

order.process('push_notification_code', (StJob, status) => {
  sendNotification(StJob.data.phoneNumber, StJob.data.message);
  status();
});
