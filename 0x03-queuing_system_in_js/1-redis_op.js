/* Node Redis client and basic operations */
import { createClient, print } from 'redis';

const reclient = createClient();

reclient.on('connect', function() {
  console.log('Redis client connected to the server');
});

reclient.on('error', function (erro) {
  console.log(`Redis client not connected to the server: ${erro}`);
});

function setNewSchool(schoolName, value) {
  reclient.set(schoolName, value, print);
};

function displaySchoolValue(schoolName) {
  reclient.get(schoolName, function(eorr, res) {
    console.log(res);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
