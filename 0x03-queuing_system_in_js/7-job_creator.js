/* Track progress and errors with Kue: Create the Job creato */
import { createQueue } from 'kue';

const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];

const order = createQueue();

jobs.forEach((theJob) => {
    const StJob = order.create('push_notification_code_2', theJob).save((erro) => {
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
