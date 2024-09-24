/* Node Redis client and async operations */
import { createClient, print } from 'redis';
import { promisify } from 'util';

const reclient = createClient();
const asget = promisify(reclient.get).bind(reclient);

reclient.on('connect', function() {
  console.log('Redis client connected to the server');
});

reclient.on('error', function (erro) {
  console.log(`Redis client not connected to the server: ${erro}`);
});

function setNewSchool(schoolName, value) {
  reclient.set(schoolName, value, print);
};

async function displaySchoolValue(schoolName) {
  const res = await asget(schoolName);
    console.log(res);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
