/*  Node Redis client publisher and subscriber*/
import { createClient } from 'redis';

const reclient = createClient();

reclient.on('connect', () => {
    console.log('Redis client connected to the server');
  });

reclient.on('error', (erro) => {
  console.log(`Redis client not connected to server: ${erro}`);
});

reclient.on('message', (chn, msg) => {
  console.log(msg);
  if (msg === 'KILL_SERVER') {
    reclient.unsubscribe(chn);
    reclient.quit();
  }
});

reclient.subscribe('holberton school channel');
