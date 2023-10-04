const productManager = require('./main.js')
const express = require('express')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function startServer() {
  try {
    const products = await productManager.getProducts()

    app.get('/products', (req, res) => {
      const limit = parseInt(req.query.limit);
      if (!limit || limit >= products.length) {
        res.send(products);
      } else if (isNaN(limit) || limit <= 0) {
        return res.send({ error: 'Invalid limit parameter' });
      } else {
        const productsLimited = products.slice(0, limit);
        res.send(productsLimited);
      }
    });

    app.get('/products/:id', (req, res) => {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        return res.send({ error: 'The entered parameter is not a number' });
      }
      if (id < 1 || id > products.length) {
        return res.send({ error: 'The entered parameter is not valid' });
      }
      res.send(products[id - 1])
    })

    const server = app.listen(port, () => {
      console.log(`Server runing at http://localhost:${port}`);
    });
    server.on('error', (err) => console.log(`Server Error: ${err}`));

  } catch (error) {
    console.error(error);
  }
}

startServer();