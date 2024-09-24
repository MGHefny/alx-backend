/* Node Redis Client */
import { createClient } from 'redis';

function redisConnect() {
  const reclient = createClient();

  reclient.on('connect', function() {
    console.log('Redis reclient connected to the server');
  }).on('error', (erro) => {
    console.log(`Redis reclient not connected to the server: ${erro}`);
  });

};

redisConnect();
