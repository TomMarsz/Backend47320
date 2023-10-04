const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const content = await fs.readFile(`./${this.path}`, 'utf-8');
      return JSON.parse(content)
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(productData) {
    function generateAlphanumericCode(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    }

    try {
      const content = await fs.readFile(`./${this.path}`, 'utf-8');
      const products = JSON.parse(content);
      const id = products.length + 1;
      const code = generateAlphanumericCode(6);
      const newProduct = { id, code, ...productData };
      products.push(newProduct);
      await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2));
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const content = await fs.readFile(`./${this.path}`, 'utf-8');
      const products = JSON.parse(content);
      const productsFilt = products.filter((p) => p.id === productId);
      console.log(productsFilt);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(productId, productData) {
    try {
      const content = await fs.readFile(`./${this.path}`, 'utf-8');
      const products = JSON.parse(content);
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...productData,
        };
        await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2), 'utf-8');
        console.log('Product updated successfully.');
      } else {
        console.log('Product not found.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(productId) {
    try {
      const content = await fs.readFile(`./${this.path}`, 'utf-8');
      const products = JSON.parse(content);
      const productsFilt = products.filter((p) => p.id !== productId);
      await fs.writeFile(`./${this.path}`, JSON.stringify(productsFilt, null, 2));
      console.log(productsFilt);
    } catch (error) {
      console.log(error);
    }
  }
}
const productManager = new ProductManager('../products.json')
module.exports = productManager