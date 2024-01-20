const readline = require('readline');

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}

function showProductList(products) {
  console.log("Product List:");
  products.forEach(product => {
    console.log(`${product.id}. ${product.name} - $${product.price}`);
  });
}

function main() {
  // Sample products
  const product1 = new Product(1, "Laptop", 800);
  const product2 = new Product(2, "Phone", 1000);
  const product3 = new Product(3, "Headphones", 300);
  const product4 = new Product(4, "Airpods", 100);
  const product5 = new Product(5, "Phonechager",150);
  

  const products = [product1, product2, product3, product4, product5];

  const cart = new ShoppingCart();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function addToCart() {
    showProductList(products);
    rl.question("Enter the product ID to add to cart (or type 'done' to finish): ", (input) => {
      if (input.toLowerCase() === 'done') {
        askUser();
      } else {
        const productID = parseInt(input);
        const selectedProduct = products.find(product => product.id === productID);
        if (selectedProduct) {
          rl.question("Enter the quantity: ", (quantity) => {
            cart.addItem(selectedProduct, parseInt(quantity));
            console.log("Product added to cart.");
            addToCart();
          });
        } else {
          console.log("Invalid product ID.");
          addToCart();
        }
      }
    });
  }

  function askUser() {
    rl.question("\n1. View Products\n2. Add to Cart\n3. View Cart\n4. Checkout\n5. Exit\nEnter your choice: ", (choice) => {
      switch (choice) {
        case "1":
          showProductList(products);
          askUser();
          break;
        case "2":
          addToCart();
          break;
        case "3":
          console.log("\nShopping Cart:");
          cart.items.forEach(item => {
            console.log(`${item.product.name} - Quantity: ${item.quantity}`);
          });
          console.log(`Total: $${cart.calculateTotal()}`);
          askUser();
          break;
        case "4":
          console.log(`Total amount to pay: $${cart.calculateTotal()}`);
          console.log("Thank you for shopping with us!");
          rl.close();
          break;
        case "5":
          console.log("Exiting the application. Goodbye!");
          rl.close();
          break;
        default:
          console.log("Invalid choice. Please enter a valid option.");
          askUser();
          break;
      }
    });
  }

  askUser();
}

main();
