/* Writing the test for job creation */
import { createQueue } from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';


const queue = createQueue();

describe('createPushNotificatinsJobs', function() {
  before(function () {
    queue.testMode.enter();
  });

  afterEach(function () {
    queue.testMode.clear();
  });

  after(function () {
    queue.testMode.exit();
  });

  it('display an error message if jobs is not an array', function() {
    expect(function(){ createPushNotificationsJobs('job', queue)}).to.throw(Error, 'Jobs is not an array');
  });

  it('create two new jobs to the queue', function() {
    const jobs = [
      {
        phoneNumber: '01288888883',
        message: 'This is the code 5858 to verify your account'
      },
      {
        phoneNumber: '01288888884',
        message: 'This is the code 5252 to verify your account'
      },
    ];

    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].data).to.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.equal(jobs[1]);
    expect(queue.testMode.jobs.length).to.equal(2);
  });
});
