const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const content = JSON.parse(await fs.readFile(`./${this.path}`, 'utf-8'));
      return content
    } catch (error) {
      console.log(error);
      return []
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
      const products = await this.getProducts()
      const id = products.length + 1;
      const code = generateAlphanumericCode(6);
      const newProduct = { id, code, ...productData };
      products.push(newProduct);
      await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2));
      console.log('New product added:', newProduct);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts()
      const productsFilt = products.filter((p) => p.id === productId);
      return productsFilt
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(productId, productData) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...productData,
        };
        await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2), 'utf-8');
        console.log('Product updated successfully.');
        return products
      } else {
        console.log('Product not found.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(productId) {
    try {
      const products = await this.getProducts()
      const productsFilt = products.filter((p) => p.id !== productId);
      await fs.writeFile(`./${this.path}`, JSON.stringify(productsFilt, null, 2));
      console.log(`Product with the Id: ${productId} is deleted`);
      return productsFilt
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager('../products.json')
module.exports = productManager