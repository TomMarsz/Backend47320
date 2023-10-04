const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = path
  }

  async getProducts() {
    try {
      const content = await JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
      console.log(content);
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
      const products = await JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
      const id = products.length + 1;
      const code = generateAlphanumericCode(6);
      const newProduct = { id, code, ...productData };
      products.push(newProduct);
      fs.writeFileSync(`./${this.path}`, JSON.stringify(products, null, 2));
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const products = await JSON.parse(fs.readFile(`./${this.path}`, "utf-8"));
      const productsFilt = products.filter((p) => p.id === productId);
      console.log(productsFilt);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(productId, productData) {
    try {
      const products = await JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...productData,
        };
        fs.writeFileSync(`./${this.path}`, JSON.stringify(products, null, 2), 'utf-8');
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
      const products = await JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
      const productsFilt = products.filter((p) => p.id !== productId);
      fs.writeFileSync(`./${this.path}`, JSON.stringify(productsFilt, null, 2));
      console.log(productsFilt);
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager('products.json');

// productManager.getProducts();
// productManager.getProductById(3);
// productManager.deleteProductById(2);
// productManager.addProduct({ title: "Peugeot", price: 7000, thumbnail: "https://yt3.ggpht.com/ytc/AMLnZu9VHYpPZl_WboTCenxYZtchOdCvzgy53zvLsOGYig=s88-c-k-c0x00ffffff-no-rj", stock: 10 });
// productManager.updateProductById(3, { title: "Peugeot", price: 7000, thumbnail: "https://yt3.ggpht.com/ytc/AMLnZu9VHYpPZl_WboTCenxYZtchOdCvzgy53zvLsOGYig=s88-c-k-c0x00ffffff-no-rj", stock: 10 })
