/* Create the Job creator*/
import { createQueue } from 'kue';

const order = createQueue();
const InfoJob = { phoneNumber: '+201288888882', message: 'This is the code to verify your account' };
const StJob = order.create('push_notification_code', InfoJob).save((erro) => {
  if (!erro) console.log(`Notification job created: ${StJob.id}`);
});

StJob.on('complete', () => console.log('Notification job completed'));
StJob.on('failed', () => console.log('Notification job failed'));
