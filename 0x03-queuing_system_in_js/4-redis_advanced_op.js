/*Node Redis client and advanced operations*/
import { createClient, print } from 'redis';

const reclient = createClient();

reclient.on('connect', function() {
  console.log('Redis client connected to the server');
});

reclient.on('error', function(erro) {
  console.log(`Redis client not connected to the server: ${erro}`);
});

reclient.hset('HolbertonSchools', 'Portland', '50', print);
reclient.hset('HolbertonSchools', 'Seattle', '80', print);
reclient.hset('HolbertonSchools', 'New York', '20', print);
reclient.hset('HolbertonSchools', 'Bogota', '20', print);
reclient.hset('HolbertonSchools', 'Cali', '40', print);
reclient.hset('HolbertonSchools', 'Paris', '2', print);
reclient.hgetall('HolbertonSchools', function (erro, res) {
  console.log(res);
});
