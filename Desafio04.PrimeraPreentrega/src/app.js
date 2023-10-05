const productManager = require('./main')
const express = require("express");
const { Router } = express;
const app = express();
const port = 8080

const routerProducts = new Router()
const routerCarts = new Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.get("/", (req, res) => {
  res.send({ error: "Use the routes '/api/products' or '/api/carts'" });
});

routerProducts.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    const limit = parseInt(req.query.limit);
    if (!limit || limit >= products.length) {
      res.send(products);
    } else if (isNaN(limit) || limit <= 0) {
      return res.send({ error: 'Invalid limit parameter' });
    } else {
      const productsLimited = products.slice(0, limit);
      res.send(productsLimited);
    }
  } catch (error) {
    console.log(error);
  }
});

routerProducts.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const products = await productManager.getProducts()
    if (isNaN(id)) {
      return res.send({ error: 'The entered parameter is not a number' });
    } else if (id < 1 || id > products.length) {
      return res.send({ error: 'The entered parameter is not valid' });
    } else {
      res.send(await productManager.getProductById(id))
    }
  } catch (error) {
    console.log(error);
  }
})

routerProducts.post('/', async (req, res) => {
  const { body } = req
  res.send(await productManager.addProduct(body))
})

routerProducts.put('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const { body } = req
  res.send(await productManager.updateProductById(pid, body))
})

routerProducts.delete('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  res.send(await productManager.deleteProductById(pid))
})

const server = app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
server.on('error', (err) => console.log(`Server Error: ${err}`));