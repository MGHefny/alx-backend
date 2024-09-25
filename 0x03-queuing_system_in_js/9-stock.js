/* In stock */
import { createClient } from 'redis';
import express from 'express';
import { promisify } from 'util';

const run = express();
const port = 1245;
const reclient = createClient();

reclient.on('connect', function() {
  console.log('Redis client connected to the server');
});

reclient.on('error', function (erro) {
  console.log(`Redis client not connected to the server: ${erro}`);
});

const get = promisify(reclient.get).bind(reclient);

//the data
const listProducts = [{
    id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
  ];

function getItemById(id) {
  return listProducts.filter((item) => item.itemId === id)[0];
}

function reserveStockById(itemId, stock) {
  reclient.set(itemId, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await get(itemId);
  return stock;
}

run.get('/list_products', function (request, result) {
  result.json(listProducts);
});

run.get('/list_products/:itemId', async function (request, result) {
  const itemId = request.params.itemId;
  const item = getItemById(parseInt(itemId));

  if (item) {
    const stock = await getCurrentReservedStockById(itemId);
    const resItem = {
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      initialAvailableQuantity: item.initialAvailableQuantity,
      currentQuantity: stock !== null ? parseInt(stock) : item.initialAvailableQuantity,
    };
    result.json(resItem);
  } else {
    result.json({"status": "Product not found"});
  }
});
// the run proj
run.get('/reserve_product/:itemId', async function (request, result) {
  const itemId = request.params.itemId;
  const item = getItemById(parseInt(itemId));

  if (!item) {
    result.json({"status": "Product not found"});
    return;
  }
//check stock 
  const currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock !== null) {
    currentStock = parseInt(currentStock);
    if (currentStock > 0) {
      reserveStockById(itemId, currentStock - 1);
      result.json({"status": "Reservation confirmed", "itemId": itemId});
    } else {
      result.json({"status": "Not enough stock available", "itemId": itemId});
    }
  } else {
    reserveStockById(itemId, item.initialAvailableQuantity - 1);
    result.json({"status": "Reservation confirmed", "itemId": itemId});
  }
});
//run local host
run.listen(port, () => {
  console.log(`run listening at http://localhost:${port}`);
});
