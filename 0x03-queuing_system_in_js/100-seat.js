import { createClient } from 'redis';
import { createQueue } from 'kue';
import { promisify } from 'util';
import express from 'express';

//the cons
const reclient = createClient();
const run = express();
const queue = createQueue();
const port = 1245;
const reservationEnabled = true;

function reserveSeat(number) {
  reclient.set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const getAsync = promisify(reclient.get).bind(reclient);
  const availableSeats = await getAsync('available_seats');
  return Number(availableSeats);
}

//check run
run.get('/available_seats', async (request, result) => {
  const availableSeats = await getCurrentAvailableSeats();
  result.send({ numberOfAvailableSeats: availableSeats });
});

//res run
run.get('/reserve_seat', (request, result) => {
  if (!reservationEnabled) {
    result.send({ status: 'Reservation are blocked' });
    return;
  }
  result.send({ status: 'Reservation in process' });
  const reserveSeatJob = queue.create('reserve_seat').save();
  reserveSeatJob.on('complete', function() {
    console.log(`Seat reservation job ${reserveSeatJob.id} completed`);
  });
  reserveSeatJob.on('failed', (erroMessage) => {
    console.log(`Seat reservation job ${reserveSeatJob.id} failed ${erroMessage}`);
  });
});

//run get
run.get('/process', (request, result) => {
  queue.process('reserve_seat', async (stjob, status) => {
    const availableSeats = await getCurrentAvailableSeats();
    if (!availableSeats) {
      status(new Error('Not enough seats available'));
      return;
    }
    availableSeats -= 1;
    reserveSeat(availableSeats);
    if (!availableSeats) reservationEnabled = false;
    status();
  });
  result.send({ status: 'Queue processing' });
});

//main run app
run.listen(port, function() {
    console.log(`run listening at http://localhost:${port}`);
});
