class ProductManager {
  constructor() {
    this.productId = 1
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(productData) {
    // Verificar si el "code", "title" y "thumbnail" ya existe en algún producto
    // Pueden haber productos con misma "description", "price" o "stock"
    const titleExists = this.products.some((product) => product.title === productData.title);
    const codeExists = this.products.some((product) => product.code === productData.code);
    const thumbnailExists = this.products.some((product) => product.thumbnail === productData.thumbnail);
    if (codeExists || titleExists || thumbnailExists) {
      throw new Error("Product already added.");
    }

    // Asigno Id al nuevo producto
    const newProduct = { ...productData, id: this.productId };

    // Agrego el nuevo producto al array
    this.products.push(newProduct);

    this.productId++

    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  }
}

const productManager = new ProductManager();

const emptyProducts = productManager.getProducts();
console.log(`There are no available products. ${emptyProducts}`);

try {
  const newProduct = productManager.addProduct({
    title: "Test product",
    description: "This is a test product",
    price: 200,
    thumbnail: "img",
    code: "abc123",
    stock: 25,
  });
  console.log("New product added:", newProduct);

  // Llamar a getProducts nuevamente (debe mostrar el producto recién agregado)
  const productsWithNewProduct = productManager.getProducts();
  console.log("Products array with the new product added:", productsWithNewProduct);

  // Intentar agregar un producto con el mismo código (debe arrojar un error)
  productManager.addProduct({
    title: "Repeated product",
    description: "This is a repeat product",
    price: 300,
    thumbnail: "img",
    code: "abc123",
    stock: 10,
  });
} catch (error) {
  console.error("Error:", error.message);
}

// Obtener un producto por su ID (debe devolver el producto)
const arrProducts = productManager.getProducts()
const productId = arrProducts.map((product) => {
  return product.id
})
let parseProductId = parseInt(productId)
const productIdToFind = parseProductId

try {
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log("Product found by ID:", foundProduct);
} catch (error) {
  console.error("Error:", error.message);
}