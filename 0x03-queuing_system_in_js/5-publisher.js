/*  Node Redis client publisher and subscriber*/
import { createClient } from 'redis';

const reclient = createClient();

reclient.on('connect', () => {
  console.log('Redis client connected to the server');
});

reclient.on('error', (erro) => {
  console.log(`Redis client not connected to server: ${erro}`);
});

function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    reclient.publish('holberton school channel', message);
  }, time);
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
